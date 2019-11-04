# ASSUMPTIONS

You are already familiar with the React framework. 
    This project is intended to be a process document for reference during the build process. It is not intended for training programmers that are new to React and therefore does not elaborate on the "why" or the "how".

You should have the following installed:

    Node
    Node Package Manager
    HomeBrew
    Postico

# USING THIS REPO AS A TEMPLATE

Open the repo in Github: https://github.com/aholdahl/react-sample-project
Click Clone or Download, then click Download ZIP
Unzip the file and rename it
Create your database and table(s) in Postico
Update database.sql to reflect the SQL code to create the database and tables for the initial setup of your project
Update pool.js to reflect the applicable database name
Update sample.router.js to reflect the applicable table name in queryText
In Terminal, run the following commands:

    npm install
    npm run server
    cmd+t
    npm run client

The DOM should reflect "Hello World!" and "Hello from SampleComponent!", and the client console should reflect the array of objects retrieved from your database table. If so, you should be ready to code!

See the last section of this file for instructions to push your project to a new Github repository. Remember to update the README with your own information before publishing.

# BUILDING FROM SCRATCH

## CLIENT SIDE

In Terminal, type the following commands:

    npx create-react-app sample-project-name --scripts-version 2.1.8
    cd sample-project-name
    touch .gitignore
    npm init --yes
    npm install

In .gitignore, ensure the following are present:

    .DS_Store
    /node_modules

In index.css and app.css, clear all styling.
In App.js, select all and replace with the following: 

    import React, {Component} from 'react';
    import './App.css';

    class App extends Component {
    render (){
        return (
        <div className="App">
            <h1>Hello World!</h1>
        </div>
        )
    }
    }

    export default App;

Delete logo.svg
In Terminal, type the following command:

    npm start

If you see Hello World in the DOM, you are ready to build a simple client-side app.

### COMPONENTIZING THE CLIENT SIDE

In Terminal, type the following commands:

    cd src
    mkdir Components
    cd Components
    mkdir App
    mkdir SampleComponent
    cd SampleComponent
    touch SampleComponent.js
    cd ../../..

In SampleComponent, add the following code:

    import React, { Component } from 'react';

    class SampleComponent extends Component {
        render() {
            return (
                <div>
                    <h2>Hello from SampleComponent!</h2>
                </div>
            )
        }
    }

    export default SampleComponent;

Move App.js, App.css, and App.test.js into the new App folder
In index.js, update the App import to the following:

    import App from './Components/App/App.js';

In App.js, add the following code to the list of imports:

    import SampleComponent from '../SampleComponent/SampleComponent.js';

In App.js, add the following code to the return section (below Hello World):

    <SampleComponent/>

In Terminal, type the following commands:

    npm start

If you see Hello World in the DOM, you are ready to build a simple client-side app.

## SERVER SIDE

In Terminal, type the following commands:

    npm install axios
    npm install express
    npm install body-parser
    mkdir server
    cd server
    touch server.js
    cd ..

In package.json, add the following line to the first section of the object:

    "proxy": "http://localhost:5000",


In package.json, select the "start" script and replace with the following:

    "start": "node server/server.js",
    "client": "react-scripts start",
    "server": "nodemon  --watch server server/server.js",


In App.js, add the following line to the imports:

    import axios from 'axios';

In App.js, add the following lines within the class App extends Component object:

    componentDidMount(){
        axios.get('/test')
        .then((response)=>{
            console.log(response.data);
        })
    }

In server.js, add the following lines of code:

    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const PORT = process.env.PORT || 5000;

    /** ---------- MIDDLEWARE ---------- **/
    // app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(express.static('server/public'));

    app.use(bodyParser.json()); // needed for axios requests
    app.use(express.static('build'));

    /** ---------- EXPRESS ROUTES ---------- **/
    app.get('/test', (req, res) => {
        console.log('Received GET request from client');
        res.send('Hello from server');
    })

    /** ---------- START SERVER ---------- **/
    app.listen(PORT, function () {
        console.log('Listening on port: ', PORT);
    });

In Terminal, type the following commands:

    ctrl+c
    npm run server
    cmd+t
    npm run client

If you see Hello from server in the console, you are ready to build a simple server-side app.

### COMPONENTIZING THE SERVER SIDE ROUTES

In Terminal, type the following commands:

    cd server
    mkdir routes
    cd routes
    touch sample.router.js
    cd ../..

In sample.router.js, enter the following code:

    const express = require('express');
    const router = express.Router();

    module.exports = router;

Copy the GET request code block from server.js and paste int into the middle of sample.router.js (above module.exports)
Change app.get('/test') to router.get('/')
In server.js, add the following line of code to the routers section:

    const sampleRouter = require('./routes/sample.router.js');
    app.use('/test', sampleRouter);

## DATABASE

In Terminal, type the following commands:

    touch database.sql
    npm install pg

In server.js, add the following line to the middleware section:

    const pg = require('pg');

    const Pool = pg.Pool;
    const pool = new Pool({
        database: 'sample_database_name',
        host: 'localhost',
        port: 5432,
        max: 10,
        idleTimeoutMillis: 30000
    })
    pool.on('connect', () => {
        console.log('pool connected to database');
    })
    pool.on('error', () => {
        console.log('error connecting pool to database');
    })

In server.js, replace the res.send line with the following:

    let queryText = `SELECT * FROM "test_table";`
    pool.query(queryText)
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log(error);
    })

In database.sql, add the following lines:

    --DATABASE "sample_database_name"
    CREATE TABLE "test_table" (
        "id" SERIAL PRIMARY KEY,
        "content" TEXT NOT NULL
    );
    INSERT INTO "test_table" ("content") VALUES ('test');

In Postico, create the database "sample_database_name"
In SQL Query, copy+paste the CREATE TABLE script from above then click "Execute Statement"

In Terminal, type the following commands:

    cmd+t
    brew services start postgresql

If you see the array [{id: 1, content: "test"}] instead of "Hello from server" in the DOM console, you are ready to build a full-stack app.

### COMPONENTIZING THE SERVER SIDE MIDDLEWARE

In Terminal, type the following commands:

    cd server
    mkdir modules
    cd modules
    touch pool.js
    cd ../..

Cut the pg/pool code block from server.js and paste it into pool.js
In pool.js, add the following line to the bottom of the file:

    module.exports = pool;

In server.js, add the following code to the middleware section:

    const pool = require('./modules/pool.js');

For server-side routers, add the following code to the top section:

    const pool = require('../modules/pool.js');

## REDUX

In Terminal, type the following commands:

    npm install redux
    npm install react-redux
    npm install redux-logger

In index.js, add the following lines below the existing imports:

    import { createStore, combineReducers, applyMiddleware } from 'redux';
    import { Provider } from 'react-redux';
    import logger from 'redux-logger';

    const sampleReducer = (state = '', action) => {
        switch (action.type){
            case 'DISPATCH_TYPE': return 'Hello from sampleReducer';
            default: return state;
        }
    }

    const store = createStore(
        combineReducers({
            sampleReducer,
        }),
        applyMiddleware(logger)
    )

In index.js, replace <App /> with the following:

    <Provider store={store}><App /></Provider>

In App.js, add the following to the imports:

    import {connect} from 'react-redux';

In App.js, add the following to the componentDidMount:

    this.props.dispatch({
      type: 'DISPATCH_TYPE'
    })

In App.js, update export default App to the following:

    export default connect ()(App);

If you see Hello from sampleReducer in the DOM console, you are ready to begin using Redux

### COMPONENTIZING REDUX

In Terminal, type the following commands:

    cd src
    mkdir redux
    cd redux
    mkdir reducers
    cd reducers
    touch index.js
    touch sampleReducer.js
    cd ../../..

Cut the sampleReducer block from src/index.js and paste it into sampleReducer.js
In sampleReducer.js, add the following line to the bottom of the file:

    export default sampleReducer;

In src/index.js, add the following line to the imports:

    import rootReducer from './redux/reducers';

In src/index.js, select sampleReducer in const store and replace with the following:

    rootReducer,

In src/redux/reducers/index.js, add the following lines of code:

    import { combineReducers } from 'redux';
    import sampleReducer from './sampleReducer.js';

    const rootReducer = combineReducers({
        sampleReducer,
    });

    export default rootReducer;

## SAGAS

In Terminal, type the following commands:

    npm install redux-saga

In src/index.js, add the following lines to the imports:

    import createSagaMiddleware from 'redux-saga';
    import { takeEvery, put } from 'redux-saga/effects';

In src/index.js, add the following lines above the const store:

    function* rootSaga(){
        yield takeEvery('SAMPLE_SAGA', sampleSaga);
    }

    function* sampleSaga(){
        try {
            console.log('Hello from sampleSaga')
        } catch (error) {
            console.log('Error in sampleSaga: ', error)
        }
    }

    const sagaMiddleware = createSagaMiddleware();

In src/index.js, add sagaMiddleware to applyMiddleware BEFORE logger
In src/index.js, add the following lines of code below the const store:

    sagaMiddleware.run(rootSaga);
    
In App.js, add the following to componentDidMount:

    this.props.dispatch({
      type: 'SAMPLE_SAGA'
    })

If you see Hello from sampleSaga in the DOM console, you are ready to begin using Redux-Sagas

### COMPONENTIZING SAGAS

In Terminal, type the following commands:

    cd src/redux
    mkdir sagas
    cd sagas
    touch index.js
    touch sampleSaga.js
    cd ../../..

In src/index.js, add the following line to the imports:

    import rootSaga from './redux/sagas';

In src/index.js, delete the rootSaga function
In src/redux/sagas/index.js, add the following lines:

    import { all } from 'redux-saga/effects';
    import sampleSaga from './sampleSaga.js';

    function* rootSaga() {
        yield all ([
            sampleSaga(),
        ])
    }

    export default rootSaga;

In sampleSaga.js, add the following lines:

    import axios from 'axios';
    import { takeEvery, put } from 'redux-saga/effects';

    function* sampleSagaRoot() {
        yield takeEvery('SAMPLE_SAGA', sampleSaga);
    }

    export default sampleSagaRoot;

Cut the sampleSaga function from src/index.js and paste into sampleSaga.js, above the other function

## THIRD PARTY API

Coming soon...

## COOKIES

In App.js, add the following function to the imports:

    const getCookie = (cookieName) => {
    // Get name followed by anything except a semicolon
    const cookieString = RegExp('' + cookieName + '[^;]+').exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
    }

In App.js, add the following function within the class App extends Component object (or to the state, if applicable):

    state = {
        clickCount: getCookie('count') || 0,
        username: getCookie('username') || 'Guest',
        usernameIsEditable: false,
    }

Cookie details can be assigned new values as follows:

    document.cookie = "username=John Doe";

More information about cookies can be found here: https://www.w3schools.com/js/js_cookies.asp

## SESSIONS

In Terminal, type the following commands:

    npm install cookie-session

In server.js, add the following lines of code:

    const cookieSession = require('cookie-session');
    app.use(cookieSession({
        name: 'session',
        keys: ['session'],
        // Cookie Options
        maxAge: 2 * 60 * 1000 // 2 minutes
    }));

## USER AUTHENTICATION/AUTHORIZATION

Coming soon...

## TESTING

Coming soon...

## VERSION CONTROL

Go to github.com and login
Click New to create a new repository
Enter the repository name: sample-project-name
Enter a description and select the desired privacy settings
Click Create Repository

In Terminal, enter the following commands:

    git init
    git add .
    git commit -m "initial commit"
    git remote add origin https://github.com/yourUserName/sample-project-name.git
    git push -u origin master

Going forward, if you are the sole contributor, future changes can be pushed as follows:

    git add .
    git commit -m "description of recent changes"
    git push

## README

Update your Readme before deployment. A good readme should include:
    Project Name
    List of Technologies
    Instructions for downloading and running the project on a local machine
        System Prerequisites
        Installation
    Table of Contents
    Documentation on how a user would experience the completed features of the app (with screenshots)
    Debugging/Testing Instructions and list of known issues
    Next version wishlist
    Deployment Information
    Author Attribution
    Achnowledgements

## ACCESSIBILITY/USABILITY PRINCIPLES

Coming soon...

## DEPLOY TO HEROKU (NO DATABASE)

Assuming you have already installed the Heroku CLI:

Login to Heroku.com
Click New, then select Create New App
Enter your project name: sample-project-name
Click Create App

In Terminal, enter the following command and follow the prompts:

    heroku login
    heroku git:remote -a sample-project-name
    git add .
    git commit -m "description of recent changes"
    git push heroku master

To update deployment

    git add .
    git commit -m "description of recent changes"
    git push heroku master

## DEPLOY TO HEROKU (FULL-STACK)

In Server.js, ensure the PORT is as follows:

    const PORT = process.env.PORT || 5000;

In pool.js, update the const Pool AND const pool to the following:

    const url = require('url');
    let config = {};

    if (process.env.DATABASE_URL) {
        const params = url.parse(process.env.DATABASE_URL);
        const auth = params.auth.split(':');
        config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true,
        max: 10,
        idleTimeoutMillis: 30000,
    };

        const pool = new Pool(config ||
            {
                database: 'sample_database_name',
                host: 'localhost',
                port: 5432,
                max: 10,
                idleTimeoutMillis: 30000
            }
        )
    }

Update the pool.on('error') function to include the following exit method:

    process.exit(-1);

In Terminal, enter the following command:

    npm run build
    heroku addons:create heroku-postgresql:hobby-dev
    heroku pg:push sample_database_name DATABASE_URL
    git add .
    git commit -m "description of recent changes"
    git push heroku master
    heroku open

If the project launches successfully, the build was successful
To update deployment:

    npm run build
    git add .
    git commit -m "description of recent changes"
    git push heroku master