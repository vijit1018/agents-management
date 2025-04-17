const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Admin");
const { loginAgent } = require('../controllers/agentAuthController');

const router = express.Router();

// Register Admin
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Admin User
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await user.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post('/agent/login', loginAgent);

module.exports = router;