import playersModel from "../models/playersModel.js";

export const searchPlayers = async (req, res, next) => {
  try {
    const players = await playersModel.searchPlayers(req.query, req.profiler);

    // If request comes from AJAX fetch API, return ONLY the partial HTML
    if (req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest') {
      return res.render('partials/playerCards', { players });
    }

    // Default initial page load
    res.render('index', { players });
  } catch (err) {
    next(err);
  }
};