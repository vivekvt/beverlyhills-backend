const express = require("express");
const commonController = require("../controllers/commonController");

const router = express.Router();

router.route("/menu").get(commonController.getMenu);

module.exports = router;