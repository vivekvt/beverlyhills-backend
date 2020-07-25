const catchAsync = require("./../utils/catchAsync");

exports.getAll = (Model) =>
    catchAsync(async(req, res, next) => {
        const doc = await Model.find();
        // Send Response
        res.status(200).json({
            status: "success",
            result: doc.length,
            data: {
                data: doc,
            },
        });
    });