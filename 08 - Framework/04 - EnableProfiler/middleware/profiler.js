class Profiler {

    constructor() {
        this.startedAt = null;
    }

    //Remember the moment the request came in
    start() {
        this.startedAt = Date.now();
    }

    //Give back how long the request took
    stop() {
        return Date.now() - this.startedAt;
    }
}

//Middleware: times the request and prints it once the page has been sent
function profiler(request, response, next) {
    const timer = new Profiler();

    timer.start();

    response.on('finish', function() {
        console.log(`${request.method} ${request.originalUrl} took ${timer.stop()} ms`);
    });

    next();
}

//app.js loads this once, so every controller gets profiled
module.exports = profiler;
