import { AsyncLocalStorage } from 'node:async_hooks';

//tracks active profiler per request
const asyncLocalStorage = new AsyncLocalStorage();

export class Profiler {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.enabled = false;
        this.startTime = Date.now();
        this.queries = [];
    }

    //record executed database query
    addQuery(sql, durationMs = 0) {
        this.queries.push({
            sql,
            duration: Number(durationMs).toFixed(2)
        });
    }

    //static helper called by models
    static recordQuery(sql, params = [], durationMs = 0) {
        const profiler = asyncLocalStorage.getStore();
        if (profiler) {
            profiler.addQuery(sql, durationMs);
        }
    }

    //middleware to initialize profiler and intercept render
    static middleware() {
        return (req, res, next) => {
            const profiler = new Profiler(req, res);
            req.profiler = profiler;

            //allow controllers to toggle profiler
            res.enableProfiler = (enable = true) => {
                profiler.enabled = Boolean(enable);
            };

            //intercept render to append profiler html if enabled
            const originalRender = res.render.bind(res);
            res.render = function (view, options = {}, callback) {
                originalRender(view, options, (err, html) => {
                    if (err) return callback ? callback(err) : next(err);

                    let outputHtml = html;
                    if (profiler.enabled) {
                        const profilerHtml = profiler.renderHtml();
                        outputHtml = outputHtml.includes('</body>')
                            ? outputHtml.replace('</body>', `${profilerHtml}\n</body>`)
                            : `${outputHtml}\n${profilerHtml}`;
                    }

                    if (callback) return callback(null, outputHtml);
                    res.send(outputHtml);
                });
            };

            asyncLocalStorage.run(profiler, () => next());
        };
    }

    //escape helper to prevent xss in displayed data
    static escape(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    //generates profiler html
    renderHtml() {
        const totalDurationMs = Date.now() - this.startTime;
        const postData = this.req.body;
        const getData = this.req.query;
        const sessionData = this.req.session ? { ...this.req.session } : null;
        if (sessionData && sessionData.cookie) delete sessionData.cookie;

        const formatTable = (data, emptyMessage) => {
            if (!data || Object.keys(data).length === 0) {
                return `<p>${emptyMessage}</p>`;
            }
            let rows = '';
            for (const [key, val] of Object.entries(data)) {
                const formatted = typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
                rows += `<tr>
                    <td style="width: 25%; font-weight: bold;">${Profiler.escape(key)}</td>
                    <td><pre>${Profiler.escape(formatted)}</pre></td>
                </tr>`;
            }
            return `<table>${rows}</table>`;
        };

        const queriesHtml = () => {
            if (this.queries.length === 0) {
                return `<p>No database queries were executed for this request.</p>`;
            }
            let rows = '';
            this.queries.forEach((q) => {
                rows += `<tr>
                    <td style="width: 100px;">${q.duration} ms</td>
                    <td><code>${Profiler.escape(q.sql)}</code></td>
                </tr>`;
            });
            return `<table>
                <thead><tr><th>Time</th><th>SQL Query</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>`;
        };

        return `
        <!-- express profiler -->
        <style>
            #profiler {
                margin: 30px auto;
                max-width: 950px;
                font-family: monospace;
                font-size: 13px;
                color: #111;
            }
            #profiler h2 {
                margin: 0 0 12px 0;
                font-size: 16px;
                border-bottom: 1px solid #ccc;
                padding-bottom: 6px;
            }
            #profiler fieldset {
                border: 1px solid #ccc;
                margin-bottom: 12px;
                padding: 8px 12px;
            }
            #profiler legend {
                font-weight: bold;
                padding: 0 6px;
            }
            #profiler table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 6px;
            }
            #profiler th, #profiler td {
                border: 1px solid #ccc;
                padding: 6px 8px;
                text-align: left;
                vertical-align: top;
            }
            #profiler th {
                background: #f7f7f7;
            }
            #profiler pre {
                margin: 0;
                white-space: pre-wrap;
                word-break: break-all;
            }
            #profiler p {
                margin: 4px 0;
                color: #555;
            }
        </style>
        <div id="profiler">
            <h2>Express Profiler</h2>

            <fieldset>
                <legend>BENCHMARKS</legend>
                <table>
                    <tr><td style="width: 25%; font-weight: bold;">Total Execution Time</td><td>${totalDurationMs} ms</td></tr>
                </table>
            </fieldset>

            <fieldset>
                <legend>DATABASE QUERIES (${this.queries.length})</legend>
                ${queriesHtml()}
            </fieldset>

            <fieldset>
                <legend>GET VARIABLES</legend>
                ${formatTable(getData, 'No GET data exists')}
            </fieldset>

            <fieldset>
                <legend>POST VARIABLES</legend>
                ${formatTable(postData, 'No POST data exists')}
            </fieldset>

            <fieldset>
                <legend>SESSION DATA</legend>
                ${formatTable(sessionData, 'No Session data exists')}
            </fieldset>
        </div>
        `;
    }
}

export default Profiler;
