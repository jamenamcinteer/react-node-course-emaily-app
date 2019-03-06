const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users"); // fetching out of mongoose

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log("access token", accessToken);
      // console.log("refresh token", refreshToken);
      // console.log("profile", profile);

      // initiate a search over all records in collection
      // returns a promise (async)
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile id
        } else {
          // we don't have a user record with this ID, make a new record
          new User({ googleId: profile.id }).save(); // new instance of a user, then save to db
        }
      });
    }
  )
); // new instance of google strategy, pass in config
