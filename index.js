const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDb } = require("./connect");
const app = express();
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
const PORT = 8000;

connectToMongoDb("mongodb://127.0.0.1:27017/blogify")
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log("MongoDb connection failed", err));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
