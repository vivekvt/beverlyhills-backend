const catchAsync = require("./../utils/catchAsync");
const Ivdrip = require("../models/ivdripModel");
const Team = require("../models/teamModel");
const Service = require("../models/serviceModel");
const Therapie = require("../models/therapieModel");

exports.getMenu = catchAsync(async(req, res) => {
    const ivdrips = await Ivdrip.find().select({ slug: 1, title: 1 });
    const teams = await Team.find().select({ slug: 1, title: 1 });
    const therapies = await Therapie.find().select({ slug: 1, title: 1 });
    const services = await Service.find().select({ slug: 1, title: 1 });
    // Send Response
    res.status(200).json({
        status: "success",
        data: {
            ivdrips,
            therapies,
            teams,
            services,
        },
    });
});