const Ivdrip = require("./../models/ivdripModel");
const factory = require("./handlerFactory");

exports.getAllIvdrips = factory.getAll(Ivdrip);