const express = require("express");
const ivdripController = require("../controllers/ivdripController");

const router = express.Router();

router.route("/").get(ivdripController.getAllIvdrips);

module.exports = router;