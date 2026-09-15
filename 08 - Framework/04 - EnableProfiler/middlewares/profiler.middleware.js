// middleware/profiler.js
const { AsyncLocalStorage } = require('async_hooks');

const profilerStorage = new AsyncLocalStorage();

function profiler(req, res, next) {
    const profiler = {
        start: process.hrtime.bigint(),
        queries: []
    };

    const originalEnd = res.end;

    res.end = function (...args) {

        const end = process.hrtime.bigint();
        profiler.duration = Number(end - profiler.start) / 1_000_000;

        console.log("===== PROFILER =====");
        console.log("URL:", req.method, req.originalUrl);
        console.log("Duration:", profiler.duration, "ms");
        console.log("Queries:");
        console.table(profiler.queries);
        console.log("====================");

        return originalEnd.apply(this, args);
    };

    profilerStorage.run(profiler, () => {
        next();
    });
}

function getProfiler() {
    return profilerStorage.getStore();
}

module.exports = {
    profiler,
    getProfiler
};