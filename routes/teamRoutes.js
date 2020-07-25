const express = require("express");
const teamController = require("../controllers/teamController");

const router = express.Router();

router.route("/").get(teamController.getAllTeams);

module.exports = router;