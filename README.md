# RoonLabs Wiki

### Technologies
> Nodejs v12, MySQL

### Steps

1. First of all run
```
$ npm install
```

2. Create an environment file named .env and if you want to run on your local database then copy the content from .env.dev or if you don't then copy the content from .env.prod
> If you would like to use your local database you must follow the step 3, if you wouldn't then go to step 4

3. To create the database you should run the follow commands with the environment variable:
3.1.
```
$ npm run migrate $1
```
Example:
```
$ npm run migrate development
```

(Please take a look on config/database.js file.)

4. Run the project
```
$ npm start
```

5. Test command
```
$ npm run test
```

That's it!
