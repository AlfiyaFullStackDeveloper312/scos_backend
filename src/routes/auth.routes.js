const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/authMiddleware");

// LOGIN
router.post("/login", authController.login);

// GET institutes + roles
router.get(
  "/my-institutes-roles",
  authMiddleware("pre_context"),
  authController.getMyInstitutesRoles
);

// SELECT CONTEXT
router.post(
  "/select-context",
  authMiddleware("pre_context"),
  authController.selectContext
);

// CURRENT USER
router.get(
  "/me",
  authMiddleware(),
  authController.getMe
);

// LOGOUT
router.post("/logout", authController.logout);

module.exports = router;