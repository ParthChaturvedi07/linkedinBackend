const express = require("express");
const passport = require("passport");
const Experience = require("../models/Experience");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();

router.post("/create", isLoggedIn, async function (req, res) {
  try {
    const user = req.user;
    const { companyName, position, startDate, endDate, description } = req.body;

    if (!companyName || !position) {
      return res.status(400).json({ message: "Invalid Details" });
    }

    // Create the experience entry
    const experience = await Experience.create({
      companyName,
      position,
      startDate,
      endDate,
      description,
    });

    user.experiences.push(experience._id);
    await user.save();

    return res.status(200).json(experience);
  } catch (error) {
    console.error("Error creating experience:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
