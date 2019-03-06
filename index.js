const express = require("express"); // CommonJS modules on server side (use require, not import which is ES2015 modules)
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000; // use environment variable in prod or 5000 on local
app.listen(PORT);
