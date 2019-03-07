const express = require("express"); // CommonJS modules on server side (use require, not import which is ES2015 modules)
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days before it expires
    keys: [keys.cookieKey] // key to encrypt our cookie, can be any random string of characters; can add multiple keys as an additional layer of security
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000; // use environment variable in prod or 5000 on local
app.listen(PORT);
