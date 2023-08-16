const Course = require("../models/Course");

const {
    mongooseToObject,
    multipleMongooseToObject,
} = require("../../util/mongoose");

class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty("_sort")) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([courseQuery, Course.findDeleted({})])
            .then(([courses, deletedCount]) => {
                res.render("me/stored-courses", {
                    deletedCount: deletedCount.filter(
                        (course) => course.deleted
                    ).length,
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(() => {});
    }

    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) => {
                res.render("me/trash-courses", {
                    courses: multipleMongooseToObject(
                        courses.filter((course) => course.deleted === true)
                    ),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
