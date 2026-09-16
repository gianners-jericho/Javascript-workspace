class DashboardController {
    viewDashboard(req, res) {
        console.log("dashboard controller", req.session.user)
        res.render('dashboard', { user: req.session.user ?? null });
    };
}

module.exports = new DashboardController;