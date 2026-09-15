import CarModel from '../models/carModel.js';

export const index = async (req, res, next) => {
  try {
    // 1. Session tracking for visit count
    req.session.visits = (req.session.visits || 0) + 1;

    // 2. Retrieve records via base model inheritance
    const cars = await CarModel.getAllCars();

    // 3. Render view passing visits and car records
    res.render('index', { 
      visits: req.session.visits, 
      cars 
    });
  } catch (err) {
    next(err);
  }
};

export const resetVisits = (req, res) => {
  req.session.visits = 0;
  res.redirect('/');
};