const Service = require("./../models/serviceModel");
const factory = require("./handlerFactory");

exports.getAllServices = factory.getAll(Service);