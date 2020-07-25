const mongoose = require("mongoose");
const slugify = require("slugify");

const therapieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
    },
    slug: String,
    description: String,
});

therapieSchema.index({ slug: 1 });

// DOCUMENT Middleware runs before.save and.create()
therapieSchema.pre("save", function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

const Therapie = mongoose.model("Therapie", therapieSchema);

module.exports = Therapie;