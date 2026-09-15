// utils/Profiler.js

export default class Profiler {
  constructor() {
    this.queries = [];
    this.startTime = Date.now();
  }

  // Method to log executed SQL queries
  logQuery(sql, params, executionTime) {
    this.queries.push({
      sql,
      params,
      time: `${executionTime}ms`
    });
  }

  // Generate HTML output to append at the bottom of the page
  renderHTML(req) {
    const totalTime = Date.now() - this.startTime;

    return `
      <div id="express-profiler" style="background: #222; color: #00ff66; padding: 15px; font-family: monospace; margin-top: 30px; border-top: 4px solid #00ff66;">
        <h3>🚀 Express Profiler (${totalTime}ms)</h3>
        
        <details>
          <summary><strong>Database Queries (${this.queries.length})</strong></summary>
          <pre>${JSON.stringify(this.queries, null, 2)}</pre>
        </details>

        <details>
          <summary><strong>POST Data (req.body)</strong></summary>
          <pre>${JSON.stringify(req.body || {}, null, 2)}</pre>
        </details>

        <details>
          <summary><strong>GET Params (req.query)</strong></summary>
          <pre>${JSON.stringify(req.query || {}, null, 2)}</pre>
        </details>

        <details>
          <summary><strong>Session Data (req.session)</strong></summary>
          <pre>${JSON.stringify(req.session || {}, null, 2)}</pre>
        </details>
      </div>
    `;
  }
}