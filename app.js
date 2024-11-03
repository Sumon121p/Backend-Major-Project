const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const LocalStategy = require("passport-local");
const passport = require("passport");
const UserModel = require("./Models/Users");
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const MONGO_URL = process.env.ATLASDB_URL;
// const MONGO_URL = "mongodb://localhost:27017/majorproject";
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connect");
  })
  .catch((err) => {
    console.log(err);
  });

const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Error in Mongo Session Store", err); 
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStategy(UserModel.authenticate()));

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  })
);

//Authentication user

app.get("/", (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ err: "Unauthorized" });
  } else {
    return res.status(200).json(user);
  }
});

app.use("/api/List", require("./Route/ListRouter"));
app.use("/", require("./Route/UserRoute"));

app.listen(8080, () => {
  console.log("Server running on 8080");
});
