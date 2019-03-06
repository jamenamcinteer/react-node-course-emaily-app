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

### Overview of what we will be doing

HTTP is Stateless: Between any two given requests that we make, HTTP has no way to share information between two separate requests

We will be using cookie-based authentication

We will have a header inside response sent to browser "Set-Cookie"; token will uniquely identify the user. Browser will store token in memory and automatically append it in any request sent to server.

This cookie-based approach has a couple of shortcomings compared to JSON-based web tokens.

mongoose.js is an optional library used in this course, used to make our lives easier when working with MongoDB.

### How Mongo Internally Stores Info

Stores as records in collections in an instance. A collection (e.g. users) contains many records (individual users). Every record is a piece of JSON.

Schemaless: inside a collection, every record can have its own distinct set of properties. This is in contrast to databases like SQL where there are defined set of properties.

In the JS World (Express, NodeJS), we have two important concepts implemented by mongoose. We make use of a Model Class - it represents an entire MongoDB collection, used to access a single collection. Has a bunch of functions attached to it used to work with the collection.

Mongoose also gives us access to Model Instances - JS objects that represent a single record inside a collection.

One class is related to one collection, one instance is related to one instance.

1.  Go to https://www.mongodb.com/cloud/atlas and click the "Start Free" button (or Sign In if you already have account)
2.  Create your MongoDB user account
3.  After creating your account, you will be prompted to create your first cluster.
    Leave all free tier options selected - AWS, North America: N. Virginia etc.
4.  Scroll down on this page to name your app:
5.  Click the "Create Cluster" button:
6.  The cluster will take a few minutes or more to generate, eventually you will see a page like this:
7.  Click the "CONNECT" button in your cluster's sandbox. You will get the following screen asking you to whitelist your address.
    Click the "Add your Current IP Address" button.
8.  You will then need to create a database user and password. After doing so, click the "Create MongoDB User" button.
9.  After creating the user, you should get this success dialog box. Click the "Choose a connection method" button.
10. Select the "Short SRV connection String" and then copy the address it provides you.
    You will need to replace <PASSWORD> with the database user's actual password created earlier when you paste into your application.
    Click the "Close" button and head back over to your Emaily application.
11. In your config/keys.js file create the mongoURI key value pair if you haven't already done so.
    Remember the comma if adding in-between other key value pairs:
    Add the connection string by pasting the entire SRV address string you copied in the screen before.
    Remember to replace <PASSWORD> with the user's actual password.
    Your root index.js connect function should still look like this:
12. In a few lectures you will be testing adding users to your database cluster.
    To see these results, navigate back to your cluster's dashboard and click the 'emaily' project link:
13. Select the 'Collections' tab:
14. You should see the collection of users and user objects that have successfully authenticated to your app:

### Wire up mongoose

`npm install --save mongoose`

Deprecation warnings are being produced by mongoDB instance because of code in mongoose; until mongoose fixes it, there is nothing we can do to make the warning go away.

Mongoose requires the properties to be defined (unlike MongoDB)

We can freely add in and remove properties as we see fit
