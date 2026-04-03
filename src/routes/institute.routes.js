const express = require("express");
const router = express.Router();

const instituteController = require("../controllers/institute.controller");

// CREATE
router.post("/", instituteController.createInstitute);

// GET
router.get("/", instituteController.getInstitutes);

module.exports = router;