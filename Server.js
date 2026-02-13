import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import userModel from "./schema/userSchema.js";
import taskModel from "./schema/taskSchema.js";
import authMiddleware from "./middleware/auth.js";
import { sendOTP } from "./Verify/sendMail.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));


app.get("/signup", (req, res) => {
  res.render("Signup");
});

app.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await userModel.create({
      email,
      username,
      password: hashedPassword,
      otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
      isVerified: false
    });

    await sendOTP(email, otp);

    res.redirect(`/verify?email=${email}`);

  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/verify", (req, res) => {
  const { email } = req.query;
  res.render("Verify", { email });
});

app.post("/verify", async (req, res) => {
  const { email, otp } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.send("User not found");

  if (user.otp !== otp)
    return res.send("Invalid OTP");

  if (user.otpExpiry < new Date())
    return res.send("OTP Expired");

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  res.redirect("/login");
});

app.post("/resend-otp", async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.send("User not found");

  const newOTP = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = newOTP;
  user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  await user.save();

  await sendOTP(email, newOTP);

  res.send("New OTP sent to your email.");
});

app.get("/login", (req, res) => {
  res.render("Login");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.send("User not found");

    if (!user.isVerified)
      return res.send("Please verify your account first");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Wrong password");

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");

  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.get("/", authMiddleware, async (req, res) => {
  const tasks = await taskModel.find({ userId: req.userId });
  res.render("Home", { tasks });
});

app.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  await taskModel.create({
    title,
    description,
    userId: req.userId
  });

  res.redirect("/");
});

app.post("/toggle/:id", authMiddleware, async (req, res) => {
  const task = await taskModel.findOne({
    _id: req.params.id,
    userId: req.userId
  });

  if (!task) return res.sendStatus(404);

  task.status = task.status === "pending" ? "completed" : "pending";
  await task.save();

  res.redirect("/");
});

app.get("/edit/:id", authMiddleware, async (req, res) => {
  const task = await taskModel.findOne({
    _id: req.params.id,
    userId: req.userId
  });

  if (!task) return res.sendStatus(404);

  res.render("EditTask", { task });
});

app.post("/edit/:id", authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  await taskModel.updateOne(
    { _id: req.params.id, userId: req.userId },
    { title, description }
  );

  res.redirect("/");
});

app.post("/delete/:id", authMiddleware, async (req, res) => {
  await taskModel.deleteOne({
    _id: req.params.id,
    userId: req.userId
  });

  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});