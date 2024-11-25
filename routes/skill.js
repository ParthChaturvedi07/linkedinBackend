const express = require('express');
const passport = require("passport");
const Skill = require("../models/Skill");
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

router.post(
  "/create",
  isLoggedIn,
  async (req, res) => {
    const user = req.user;
    const { skillName } = req.body;
    if (!skillName) {
      return res.status(402).json({ err: "Invalid details" });
    }

    const createdSkill = await Skill.create({
      skillName,
    });

    user.skills.push(createdSkill._id);
    await user.save();

    return res.status(200).json({ createdSkill });
  }
);

module.exports = router;
