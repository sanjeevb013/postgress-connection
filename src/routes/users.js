const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// POST - Add a new user
router.post("/", userController.addUser);

// GET - Get all users
router.get("/", userController.getAllUsers);

// GET - Get user by ID
router.get("/:id", userController.getUserById);

module.exports = router;
