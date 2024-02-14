const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  noOfRequired: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed"], // Add more statuses if needed
    default: "active", // Default status is active
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
});

jobSchema.pre("save", function (next) {
  this.category = this.category.toLowerCase();
  this.area = this.area.toLowerCase();
  next();
});

module.exports = mongoose.model("Job", jobSchema);
