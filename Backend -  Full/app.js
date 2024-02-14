const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const profileRoutes = require("./routes/profileRoutes");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

//Authentications
app.use("/", authRoutes);

//Job routes
app.use("/", jobRoutes);

//Profile routes
app.use("/profile", profileRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Connected and Listening on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
