// General class for profiler 
class Profiler {
  constructor() {
    this.startTime = null;
  }

  // For keeping track of the start time   
  start() {
    this.startTime = Date.now();
  }

  // For keeping track of the end time    
  stop() {
    return Date.now() - this.startTime;
  }
}

// Function that makes use of the profiler class that gives the results
function profiler(req, res, next) {
  const timer = new Profiler();

  timer.start();

  res.on("finish", function () {
    const duration = timer.stop();
    console.log(`${req.method} ${req.originalUrl} took ${duration}ms`);
  });

  next();
}

module.exports = profiler;