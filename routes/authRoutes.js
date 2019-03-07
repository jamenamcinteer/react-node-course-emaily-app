const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout(); // takes the cookie with id and kills it
    res.send(req.user); // give response back to the user, response is empty because req.user is empty
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user); // if logged out, req.user will be blank as will the screen
    // req.session has data attempting to be sent to passport library
  });
};
