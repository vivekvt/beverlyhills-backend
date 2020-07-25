const mongoose = require("mongoose");
const slugify = require("slugify");

const ivdripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
    },
    slug: String,
    description: String,
});

ivdripSchema.index({ slug: 1 });

// DOCUMENT Middleware runs before.save and.create()
ivdripSchema.pre("save", function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

const Ivdrip = mongoose.model("Ivdrip", ivdripSchema);

module.exports = Ivdrip;