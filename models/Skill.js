const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  skillName: {
    type: String,
  },
});

module.exports = mongoose.model("Skill", SkillSchema);
