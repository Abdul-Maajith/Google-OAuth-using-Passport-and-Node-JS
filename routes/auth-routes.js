const router = require("express").Router();
const passport = require("passport");

// Auth Login
router.get("/login", (req, res) => {
    res.render("login", {
      user: req.user,
    });
})

// Auth Logout
router.get("/logout", (req, res) => {
  // handling with passport
  req.logout();
  res.redirect("/");
})

// Auth with Google - redirecting to the consent screen.
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback route for google to redirect to.. - After callback triggered we need to get the "profile data" => in callback of passport - Google Strategy!

// If the Data retrival is successfull, then callback redirect URI of Passport Strategy is triggered! => redirection to the dashboard

// Here, we also include passport authentication as middleware, in order to get the profile information
router.get("/google/redirect", passport.authenticate('google') ,(req, res) => {
  // res.send(req.user)
  res.redirect("/profile/");
})

module.exports=router;