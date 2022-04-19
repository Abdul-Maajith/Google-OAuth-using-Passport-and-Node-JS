const express = require("express");
const app = express();
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes")

require("dotenv").config();

const cookieSession = require("cookie-session");
const passport = require("passport");

// Importing the passport config
const passportSetup = require("./config/passport-setup");

// Importing the mongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Connected to database..");
});

// Setting up the view engine
app.set("view engine", "ejs");

// Setting up the Cookie(encrypting the serialized data) and initialize the cookie.
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //A day.
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
    res.render("home", {
        user: req.user
    })
})
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.listen(5555, () => {
    console.log("App is now listening on the port 5555")
})