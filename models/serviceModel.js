const mongoose = require("mongoose");
const slugify = require("slugify");

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        rrequired: [true, "title is required"],
    },
    slug: String,
    description: String,
});

serviceSchema.index({ slug: 1 });

// DOCUMENT Middleware runs before.save and.create()
serviceSchema.pre("save", function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;