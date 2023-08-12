const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        thumbnail: { type: String },
        videoId: { type: String, required: true },
        level: { type: String },
        slug: { type: String, slug: "name", unique: true },
    },
    {
        timestamps: true,
    }
);

// Add Plugins
Course.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });
mongoose.plugin(slug);

module.exports = mongoose.model("Course", Course);
