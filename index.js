const express = require("express"); // CommonJS modules on server side (use require, not import which is ES2015 modules)
const app = express();

// a route handler
// .get() is a request method
// req = request, res = response
app.get("/", (req, res) => {
  res.send({ bye: "buddy" });
});

const PORT = process.env.PORT || 5000; // use environment variable in prod or 5000 on local
app.listen(PORT);

// Deployment Checklist
// - Dynamic Port Binding
// - Specify Node Environment
// - Specific start script
// - Create .gitignore file
