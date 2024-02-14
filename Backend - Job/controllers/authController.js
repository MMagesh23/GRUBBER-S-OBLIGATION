const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const saltRounds = 10;
const secretKey = process.env.SECRET_KEY || "mySecretKey123";

const signup = async (req, res) => {
  try {
    const { name, gender, dob, phone, email, address, area, password } =
      req.body;

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this phone number already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      gender,
      dob,
      phone,
      email,
      address,
      area,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate a JWT token for authentication
    // const token = jwt.sign(
    //   { userId: newUser._id, userType: newUser.userType },
    //   secretKey,
    //   {
    //     expiresIn: "1h",
    //   }
    // );

    return res.json({ messages: "Registration successfull" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// const login = async (req, res) => {
//   try {
//     const { phone, password } = req.body;

//     const user = await User.findOne({ phone });

//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Compare the provided password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     //token
//     console.log("Secret Key for Signing:", secretKey);
//     const token = jwt.sign({ phone: phone }, secretKey, {
//       expiresIn: "1h",
//     });

//     // const token = jwt.sign({ userId: user._id }, secretKey, {
//     //   expiresIn: "1h",
//     // });

//     return res.json({ token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a new JWT token for authentication
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { signup, login };
