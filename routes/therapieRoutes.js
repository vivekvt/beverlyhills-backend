const express = require("express");
const therapieController = require("../controllers/therapieController");

const router = express.Router();

router.route("/").get(therapieController.getAllTherapies);

module.exports = router;