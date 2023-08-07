const Course = require("../models/Course");

const {
    mongooseToObject,
    multipleMongooseToObject,
} = require("../../util/mongoose");

class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render("me/stored-courses", {
                    courses: multipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }

    //[POST] /me/:id/edit
    edit(req, res, next) {}
}

module.exports = new MeController();
