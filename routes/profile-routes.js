const router = require("express").Router();

// In order to prevent the users from directly accessing the profile(protected route), we need to validate the Authentication
const authCheck = (req, res, next) => {
    if(!req.user) {
        // If user is not loggedIn
        res.redirect("/auth/login");
    } else {
        // If logged in
        next();
    }
}

router.get("/", authCheck, (req, res) => {
    res.render("profile", {
        user: req.user
    });
})

module.exports = router;
