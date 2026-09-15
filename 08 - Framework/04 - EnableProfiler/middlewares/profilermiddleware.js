import Profiler from '../utils/profiler.js';

const profilerMiddleware = (req, res, next) => {
  // 1. Create a fresh Profiler instance for this request cycle
  req.profiler = new Profiler();

  // 2. Intercept res.render to inject profiler HTML before sending the response
  const originalRender = res.render;

  res.render = function (view, options = {}, callback) {
    // Call the original res.render to get the compiled EJS HTML string
    originalRender.call(this, view, options, (err, html) => {
      if (err) return next(err);

      // Append profiler HTML output to the bottom of the rendered page
      const profilerOutput = req.profiler.renderHTML(req);
      const finalHtml = html + profilerOutput;

      if (callback) {
        return callback(null, finalHtml);
      }
      res.send(finalHtml);
    });
  };

  next();
};

export default profilerMiddleware;