const express = require("express");
const router = express.Router();

const roleController = require("../controllers/role.controller");

// CREATE
router.post("/", roleController.createRole);

// GET
router.get("/", roleController.getRoles);

module.exports = router;