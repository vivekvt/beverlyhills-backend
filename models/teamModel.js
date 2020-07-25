const mongoose = require("mongoose");
const slugify = require("slugify");

const teamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
    },
    slug: String,
    description: String,
});

teamSchema.index({ slug: 1 });

// DOCUMENT Middleware runs before.save and.create()
teamSchema.pre("save", function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;