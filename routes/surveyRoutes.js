const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    // check that the user is logged in, use requireLogin middleware function
    // check that user has enough credits on hand to create a survey
    // destructure request body
    const { title, subject, body, recipients } = req.body;
    // create a new instance of a survey (in memory, not in db yet)
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
  });
};
