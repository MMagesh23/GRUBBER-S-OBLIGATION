const User = require("../models/User");

const showProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userDetails = await User.findById(userId);
    return res.status(200).json({ userDetails });
  } catch (error) {
    console.error("Error getting user details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const editProfile = async (req, res) => {
  try {
    const userId = req.userId; // Extracting the user ID from the token

    // Fetch user details using the extracted ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user profile based on the request body
    const { name, gender, dob, phone, email, address, area } = req.body;

    // Update only if the field is provided in the request
    if (name) user.name = name;
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;
    if (phone) user.phone = phone;
    if (email) user.email = email;
    if (address) user.address = address;
    if (area) user.area = area;

    // Save the updated user profile
    await user.save();

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { showProfile, editProfile };
