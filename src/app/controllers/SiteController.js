const Course = require("../models/Course");

const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
    index(req, res, next) {
        //[GET] /
        Course.find({})
            .then((courses) => {
                res.render("home", {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
    //[GET] /search
    search(req, res) {
        res.render("partials/search");
    }
}

module.exports = new SiteController();
