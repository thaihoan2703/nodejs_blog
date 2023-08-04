const Course = require("../models/Course");

class SiteController {
  index(req, res) {
    //[GET] /
    Course.find()
      .then((courses, err) => {
        res.json(courses);
      })
      .catch(() => {
        res.status(400).json({ error: "ERROR!!!" });
      });
  }
  //[GET] /search
  search(req, res) {
    res.render("partials/search");
  }
}

module.exports = new SiteController();
