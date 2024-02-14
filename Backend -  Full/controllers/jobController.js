const Job = require("../models/Job");

/*_______________________________________________________________________________________
______________________________________ Post a new job _______________________________________*/
const createJob = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      area,
      location,
      date,
      time,
      noOfRequired,
    } = req.body;
    const userId = req.userId; // Assuming userId is in the request

    const newJob = new Job({
      title,
      category,
      description,
      area,
      location,
      date,
      time,
      noOfRequired,
      postedBy: userId, // Assign the userId to postedBy
    });

    await newJob.save();

    return res
      .status(201)
      .json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/*___________________________________________________________________________________________
______________________________________ View all job's _______________________________________*/
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    return res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error getting jobs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/*__________________________________________________________________________________________
______________________________________ Fillter a job _______________________________________*/
const categoryJobs = async (req, res) => {
  try {
    const { area } = req.query;
    let filter = {};

    // Get the category from the URL
    const category = req.path.split("/")[2]; // Assuming the category is the third part of the URL

    if (category) {
      filter.category = category.toLowerCase();
      console.log(filter.category);
    }

    if (area) {
      filter.area = area;
    }

    // Add a condition for the date to filter out both expired and completed jobs
    filter.date = { $gte: new Date() }; // Only fetch jobs with a date greater than or equal to the current date

    // Add a condition to filter out completed jobs
    filter.status = "active"; // Only fetch jobs with an active status

    const jobs = await Job.find(filter);

    return res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error getting jobs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/*_______________________________________________________________________________________
______________________________________ View Posed job's _______________________________________*/
const getPostedJobs = async (req, res) => {
  try {
    const userId = req.userId;

    // Find all jobs posted by the logged-in user
    const jobs = await Job.find({ postedBy: userId });

    return res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error getting jobs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/*_______________________________________________________________________________________
______________________________________ Edit job detail's _______________________________________*/
const editJobDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.jobId; // Assuming the job ID is provided in the URL

    // Find the job posted by the logged-in user with the given jobId
    const job = await Job.findOne({ _id: jobId, postedBy: userId });

    // Check if the job exists
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Update job details based on the request body
    const {
      title,
      description,
      category,
      area,
      location,
      date,
      time,
      noOfRequired,
    } = req.body;

    // Update only if the field is provided in the request
    if (title) job.title = title;
    if (description) job.description = description;
    if (category) job.category = category;
    if (area) job.area = area;
    if (location) job.location = location;
    if (date) job.date = date;
    if (time) job.time = time;
    if (noOfRequired) job.noOfRequired = noOfRequired;

    // Save the updated job details
    await job.save();

    return res
      .status(200)
      .json({ message: "Job details updated successfully", job });
  } catch (error) {
    console.error("Error updating job details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/*_______________________________________________________________________________________
______________________________________ Delete job _______________________________________*/

const deleteJob = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.jobId;

    // Find the job posted by the logged-in user with the given jobId
    const job = await Job.findOne({ _id: jobId, postedBy: userId });

    // Check if the job exists
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Delete the job
    await Job.deleteOne({ _id: jobId, postedBy: userId });

    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  categoryJobs,
  getPostedJobs,
  editJobDetails,
  deleteJob,
};
