// controllers/authController.js
import jwt from "jsonwebtoken";
import User from "../Db/userSchema.js";
import bcrypt from "bcryptjs";
import addIp from "./addIp.js";

const login = async (req, res) => {
  const { email, password } = req.body; 
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET, {
      expiresIn: "21d",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export default login