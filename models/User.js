const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema } = mongoose; // ES6 destructuring

const userSchema = new Schema({
  googleId: String
});

mongoose.model("users", userSchema); // loading something into mongoose
