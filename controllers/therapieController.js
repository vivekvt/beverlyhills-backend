const Therapie = require("./../models/therapieModel");
const factory = require("./handlerFactory");

exports.getAllTherapies = factory.getAll(Therapie);