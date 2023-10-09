const { Router } = require("express");
const User = require("../models/user");
const Blog = require("../models/blog");
const router = Router();

router.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
  await User.create({
    fullname,
    email,
    password,
  });
  return res.redirect("/user");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPassword(email, password);
    return res.cookie("token", token).redirect("/user");
  } catch (error) {
    return res.render("signin", {
      error: "Invalid email or password",
    });
  }
});

router.get("/signout", (req, res) => {
  return res.clearCookie("token").redirect("/user");
});

module.exports = router;
