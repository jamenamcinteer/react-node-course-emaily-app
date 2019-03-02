# Course Notes

## Section 2

### Run server on local machine

`node index.js`

### Initial Heroku deployment

`heroku login`
`heroku create`
`git remote add heroku _url of heroku git_` - url is generated above
`git push heroku master`

### Deploying to Heroku after initial deploy

`git status` - view changes
`git add .` - stage changes
`git commit -m "Some commit message"` - commit changes
`git push heroku master` - push to remote (heroku)

### Pushing code to GitHub

`git remote add origin _remote repository URL_` - sets a new remote with name origin (compare to the remote with name heroku)
`git push origin master` - push to github remote

## Section 3
