const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY || "mySecretKey123";

function verifyToken(req, res, next) {
  const auth = req.header("Authorization");
  const token = auth && auth.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    // console.log("Received Token:", token);
    // const decoded = jwt.verify(token, secretKey);
    //console.log("Secret Key for Verification:", secretKey);
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded Payload:", decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
