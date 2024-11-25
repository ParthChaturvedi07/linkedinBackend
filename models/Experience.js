const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim :true
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return !value || value > this.startDate;
      },
      message: "End date must be after the start date",
    },
  },
  endDate: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Experience", ExperienceSchema);
