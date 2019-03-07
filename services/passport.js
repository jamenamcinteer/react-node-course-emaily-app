const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users"); // fetching out of mongoose

// first arg is user model, second is done
passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is identifying piece of information for identifying user in followup requests; this id is NOT the profile id, it is generated by MongoDB (_id property); can not assume that user has google id, could be facebook or something else; everyone will have an idea generated by mongo; after oauth authentication, we only care about this user.id, not the profile.id
});

passport.deserializeUser((id, done) => {
  // query our collection looking for a user with the id we have
  User.findById(id).then(user => {
    //.then with the user model
    done(null, user);
  });
});

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
      // findOne grabs an instance from the User collection
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile id
          done(null, existingUser); // first argument is error
        } else {
          // we don't have a user record with this ID, make a new record
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user)); // new instance of a user, then save to db
        }
      });
    }
  )
); // new instance of google strategy, pass in config
