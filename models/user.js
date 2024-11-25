const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bannerImg: {
      type: String,
      default: "",
    },
    headline: {
      type: String,
      default: "Linkedin User",
    },
    experiences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],
    edcation: [
      {
        school: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number,
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
