const express = require("express");
const router = express.Router();

const mappingController = require("../controllers/userInstituteRole.controller");

router.post("/", mappingController.createMapping);
router.get("/", mappingController.getMappings);

module.exports = router;