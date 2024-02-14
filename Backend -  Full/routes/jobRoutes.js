const express = require("express");
const jobController = require("../controllers/jobController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Protected route, only accessible by authenticated users
router.use(verifyToken);

// Route for creating a new job
router.post("/post-job", jobController.createJob);

// Route for getting all jobs
router.get("/jobs", jobController.getAllJobs);

const categories = [
  "agriculture",
  "gardening",
  "cleaning",
  "construction",
  "handyman-services",
  "moving-and-transportation",
  "home-repairs",
  "painting",
  "babysitting",
  "pet-care",
  "event-assistance",
  "technology-support",
  "cooking-and-catering",
  "freelance-writing",
  "graphic-design",
  "tutoring",
  "fitness-and-personaltraining",
  "photography",
  "peauty-and-personalcare",
  "virtual-assistance",
];

categories.forEach((category) => {
  router.get(`/jobs/${category}`, jobController.categoryJobs);
});

//Route for view posted job's
router.get("/posted-jobs", jobController.getPostedJobs);

//Route for edit job detail's
router.put("/edit-job/:jobId", jobController.editJobDetails);

//Route for delete job
router.delete("/delete-job/:jobId", jobController.deleteJob);

module.exports = router;
