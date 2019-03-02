const express = require("express"); // CommonJS modules on server side (use require, not import which is ES2015 modules)
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();

passport.use(new GoogleStrategy()); // new instance of google strategy, pass in config

const PORT = process.env.PORT || 5000; // use environment variable in prod or 5000 on local
app.listen(PORT);
