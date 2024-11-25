const express = require("express");
const passport = require("passport");
const Project = require("../models/Project");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();

router.post("/create", isLoggedIn, async (req, res) => {
  try {
    const user = req.user; // The authenticated user
    const { name, description, links } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newProject = await Project.create({
      name,
      description,
      links,
    });

    user.projects.push(newProject._id);
    await user.save();

    return res
      .status(200)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
