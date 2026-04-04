const express = require("express");
const router = express.Router();

const mappingController = require("../controllers/userInstituteRole.controller");
// POST
router.post("/", mappingController.createMapping);
// GET
router.get("/", mappingController.getMappings);

module.exports = router;