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
  district: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  numberOfPepole: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active",
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

jobSchema.pre("save", function (next) {
  this.category = this.category.toLowerCase();
  this.district = this.district.toLowerCase();

  //  Date format (DD-MM-YYYY)
  const [day, month, year] = this.date.split("-");
  const formattedDate = `${year}-${month}-${day}`;
  this.date = formattedDate;

  next();
});

module.exports = mongoose.model("Job", jobSchema);
