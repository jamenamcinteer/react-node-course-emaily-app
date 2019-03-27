const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

module.exports = app => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    // check that the user is logged in, use requireLogin middleware function
    // check that user has enough credits on hand to create a survey
  });
};
