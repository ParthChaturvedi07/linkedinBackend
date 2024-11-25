const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  links: [
    {
      type: String,
      required: true,
      match : [
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i,
        "Please provide a valid URL"
      ]
    },
  ],
});

module.exports = mongoose.model("Project", ProjectSchema);
