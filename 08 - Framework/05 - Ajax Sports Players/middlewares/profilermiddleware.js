import Profiler from '../utils/profiler.js';

const profilerMiddleware = (req, res, next) => {
  req.profiler = new Profiler();

  // Save the original res.render function
  const originalRender = res.render;

  // Intercept res.render
  res.render = function (view, options = {}, callback) {
    // Check if the request is an AJAX / fetch request
    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';

    // If it's an AJAX request or rendering a partial, perform standard render without profiler append
    if (isAjax || view.includes('partials/')) {
      return originalRender.call(this, view, options, callback);
    }

    // For standard full page renders, append the profiler bar
    originalRender.call(this, view, options, (err, html) => {
      if (err) return next(err);

      const profilerHTML = req.profiler.renderHTML(req);
      const outputHTML = html + profilerHTML;

      if (typeof callback === 'function') {
        return callback(null, outputHTML);
      }

      res.send(outputHTML);
    });
  };

  next();
};

export default profilerMiddleware;