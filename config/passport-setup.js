const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();
const UserModel = require("../models/userModels")

// In order to validate the user - we need to serialize the data(MongoDB _id) as cookie.
// Just like JWT AccessToken. 
passport.serializeUser((user, done) => {
  done(null, user.id);
})

// we can easily validate the user by deserializing the ID within cookie, Also it will attach the user property to the req - Accessed thorough redirection enpoint.
passport.deserializeUser((id, done) => {
  UserModel
    .findById(id)
    .then((user) => {
      done(null, user);
    })
});

passport.use(
  new GoogleStrategy({
    // Options for the Google Strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
  }, 
  (accessToken, refreshToken, profile, done) => {
    // After callback triggered from consent screen we can get the "profile data" here.. by passport authentication middleware

    // Check if user Already exists in our DB
    UserModel
      .findOne({ googleId: profile.id })
      .then((currentUser) => {
        if(currentUser){
          // User Already Exists - LogIn
          console.log(`User: ${currentUser.username} Successfully LoggedIn`)
          done(null, currentUser);
        } else {
          // If not, create user in DB
          new UserModel({
            username: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
          })
            .save()
            .then((newUser) => {
              console.log(`New User Created!`);
              done(null, newUser);
            });
        }
      })
  })
)