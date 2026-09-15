class StudentController {
    static index(req, res) {
        res.render("index");
    }
    
    static profile(req, res) {
        res.render("profile");
    }
}

module.exports = StudentController;