const express = require("express");
const profileController = require("../controllers/profileController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Protected route, only accessible by authenticated users
router.use(verifyToken);

router.get("/", profileController.showProfile);
router.put("/edit", profileController.editProfile);

module.exports = router;
