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

`npm install --save cookie-session` - to handle cookies

middelwares pre-process request before sending to route handlers

### Client Side

`npm install -g create-react-app` - install create-react-app globally

`create-react-app client` - run this while in server directory

`npm start` - run while in client directory

Visit localhost:3000 to see the new react application. We have a second server running for our client development environment.

`npm install --save concurrently`

### Routing / Proxy

Linking with relative link /auth/google, browser will assume the link is on the same proxy (localhost:3000) instead of (localhost:5000).

Add setupProxy.js

On heroku, there aren't separate server. Create react app is only used for local development and is static once it is built.

### Async / Await (Refactoring Promises)

New syntax for promises

Write a function to retrieve a blob of json. Make an ajax request! Use the "fetch" js function.

Endpoint: https://rallycoding.herokuapp.com/api/music_albums - arbitrary blob of json

Fetch returns a promise; returns a response object. To work with the data, have to call res.json() that returns a promise of its own.

Fetch works in modern browsers (not IE11)

```
function fetchAlbums() {
    fetch("https://rallycoding.herokuapp.com/api/music_albums")
        .then(res => res.json())
        .then(json => console.log(json))
}

fetchAlbums();
```

ES2017 syntax makes it visually look like we are writing more synchronous code, does the same thing as promises. Is called Async / Await.

```
async function fetchAlbums() {
    const res = await fetch("https://rallycoding.herokuapp.com/api/music_albums")
    const json = await res.json()

    console.log(json);
}

fetchAlbums();
```

Using arrow function:

```
const fetchAlbums = async () => {
    const res = await fetch("https://rallycoding.herokuapp.com/api/music_albums")
    const json = await res.json()

    console.log(json);
}

fetchAlbums();
```

Old syntax of passport.js:

```
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // initiate a search over all records in collection
      // returns a promise (async)
      // findOne grabs an instance from the User collection
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile id
          done(null, existingUser); // first argument is error
        } else {
          // we don't have a user record with this ID, make a new record
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user)); // new instance of a user, then save to db
        }
      });
    }
  )
); // new instance of google strategy, pass in config
```

New syntax:

```
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // initiate a search over all records in collection
      // returns a promise (async)
      // findOne grabs an instance from the User collection
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record with the given profile id
        done(null, existingUser); // first argument is error
      } else {
        // we don't have a user record with this ID, make a new record
        const user = await new User({ googleId: profile.id }).save();
        done(null, user); // new instance of a user, then save to db
      }
    }
  )
); // new instance of google strategy, pass in config
```

### React Redux

Provider is a component that makes the store accessible to every component in the app. App is immediate child of Provider.

App.js is responsible for router setup.

index.js is repsonsible for reducer setup.

BrowserRouter expects at most one child.

In jsx, `exact={true}` is the same as `exact`

### Materialize CSS

`npm install --save materialize-css` in client

Making use of webpack module that came with create react app. Webpack is a module loader.

### Current User API

React Component -> Calls an Action Creator -> Returns an Action -> Sent to reducers -> Updates state in store -> State sent back to components, causing them to render

Axios - to make ajax requests

Thunk - allows us to write action creators that break the requirement that we have to immediately return ac action from every action creator we create. Gives us direct access to the dispatch function (sending an action to reducers).

`npm install --save axios redux-thunk` in client

We want to dispatch an action once the api request has been completed

### Refactor

Refactor App component from functional to class for access to lifecycle method on render (componentDidMount())

Import connect to give certain components access to action creators

`import * as actions from "../actions"` - Get all actions defined in actions file and assign to actions object

`export default connect(null, actions)(App)` - mapStateToProps is null; second argument is normally mapDispatchToProps, which is the same as the actions object in this case. Can be accessed by, for example, `this.props.fetchUser()` without the need of a mapDispatchToProps method

With an arrow function if you have {} and a return statement and no other expressions, you can remove the curly braces and the return keyword.

```
export const fetchUser = () => {
  return function(dispatch) {
    axios
      .get("/api/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
```

Becomes:

```
export const fetchUser = () =>
  function(dispatch) {
    axios
      .get("/api/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
```

Rather than define a function keyword, return an arrow function instead:

```
export const fetchUser = () =>
  dispatch => {
    axios
      .get("/api/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
```

Don't need parenthesis with just one argument, and can move into the line above:

```
export const fetchUser = () => dispatch => {
  axios
    .get("/api/current_user")
    .then(res => dispatch({ type: FETCH_USER, payload: res }));
};
```

Use async / await syntax:

```
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res });
};
```

### Mongoose for Survey Creation

```
recipients: [String]
```

This communicates to mongoose that recipients will be an array of strings.
