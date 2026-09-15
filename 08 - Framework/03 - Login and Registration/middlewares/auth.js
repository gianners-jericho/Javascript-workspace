export const isAuth = (req, res, next) => {
  if (!req.session.student) {
    req.flash('error', ['Please log in to access this page.']);
    return res.redirect('/');
  }
  next();
};