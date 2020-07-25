const Team = require("./../models/teamModel");
const factory = require("./handlerFactory");

exports.getAllTeams = factory.getAll(Team);