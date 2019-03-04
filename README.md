# Course Notes

## Section 2

### Set up Express app

- `npm install --save express` - install express

```
app.get("/", (req, res) => {
  res.send({ bye: "buddy" });
});
```

a route handler;
.get() is a request method;
req = request, res = response

### Run server on local machine

- `node index.js`

### Deployment Checklist

- Dynamic Port Binding
- Specify Node Environment
- Specific start script
- Create .gitignore file

### Initial Heroku deployment

- `heroku login`
- `heroku create`
- `git remote add heroku _url of heroku git_` - url is generated above
- `git push heroku master`

### Deploying to Heroku after initial deploy

- `git status` - view changes
- `git add .` - stage changes
- `git commit -m "Some commit message"` - commit changes
- `git push heroku master` - push to remote (heroku)

### Pushing code to GitHub

- `git remote add origin _remote repository URL_` - sets a new remote with name origin (compare to the remote with name heroku)
- `git push origin master` - push to github remote

## Section 3

Will be using Passport JS library for OAuth. Will help handle the Server/Google interactions.

There are two common complaints with Passport JS:

- Requires us to reach into specific points in the flow and add a bit of code to make the steps work nicely; automates vast majority of OAuth flow, but not entire thing; we don't always have a good understanding of the flow
- Inherent confusion in how library is configured; we are actually installing at least two different libraries: passport (core module) and passport strategies (helpers for authentication with one very specific method like email/password, Google, Facebook, etc); if you want to use three different sign-in methods, you will need to install three passport strategies

### Install Passport

- `npm install --save passport passport-google-oauth20` - install passport and google passport strategy

> "oath20" is short for OAuth 2.0

> Can no longer use wildcards (\*) so use this instead: http://localhost:5000/auth/google/callback

console.developers.google.com -> create new project emaily-dev

1. Enable the Google OAuth API -> search for google+ api (oauth shows no results) -> click Enable
2. Create api credential - Click on Create Credentials -> want OAuth api, I chose Google+ API, Web Server, User Data, click button.

**For Authorized JavaScript origins:** http://localhost:5000

**Authorized redirect URIs:** http://localhost:5000/auth/google/callback

The clientID is a public token. We can share this with the public.

The clientSecret is a private token. We don't want to share this with the public.

Add the clientID and clientSecret to a config/keys.js file and add it to .gitignore.

Google has a list of the different scopes that are allowed

- `npm install --save nodemon` - install nodemon; allows us to not have to kill and restart the server after changes
- `npm run dev` - run the server in development mode using nodemon

## Section 4

### File structure

server

- -- config -> Protection API keys and settings
- -- routes -> All route handlers, grouped by purpose
- -- services -> Helper modules and business logic
- index.js

`require("./routes/authRoutes")(app);`

Is the same as:

```
const authRoutes = require("./routes/authRoutes");
authRoutes(app);
```

HTTP is Stateless: Between any two given requests that we make, HTTP has no way to share information between two separate requests

We will be using cookie-based authentication

We will have a header inside response sent to browser "Set-Cookie"; token will uniquely identify the user. Browser will store token in memory and automatically append it in any request sent to server.

This cookie-based approach has a couple of shortcomings compared to JSON-based web tokens.
