const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
// post
router.post("/", userController.createUser);
// get 
router.get("/", userController.getUsers);

module.exports = router;