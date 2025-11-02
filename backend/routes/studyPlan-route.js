var express = require("express");
var router = express.Router();
var controller = require("../controllers/studyPlan-controller.js");

router.post("/", controller.create)

module.exports = router
