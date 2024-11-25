const User = require("../models/user");

const getSuggestedConnections = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).select("connections");

    // find users who are not already connected and also do not recommend our qwn profile!!
    const suggestedUser = await User.find({
      _id: {
        $ne: req.user._id,
        $nin: currentUser,
      },
    })
      .select("firstName lastName profilePicture headline")
      .limit(3);

    res.json(suggestedUser);
  } catch (error) {
    console.error("Error fetching suggested connections:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.userName }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching public profile:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      "firstName",
      "lastName",
      "headline",
      "profilePicture",
      "bannerImg",
      "skills",
      "education",
      "experience",
    ];

    const updatedData = {};

    for (const field of allowedFields) {
      if (req.body[field]) {
        updatedData[field] = req.body[field];
      }
    }

    //todo check for the profile im and banner img => uploaded to cloud memory
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getSuggestedConnections, getPublicProfile, updateProfile };
