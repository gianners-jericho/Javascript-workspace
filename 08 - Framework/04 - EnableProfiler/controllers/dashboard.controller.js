class DashboardController {
    viewDashboard(req, res) {
        res.render('dashboard', { user: req.session.user ?? null });
    };
}

module.exports = new DashboardController;