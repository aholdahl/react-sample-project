# ASSUMPTIONS

You should have the following installed:
--
    Node
    Node Package Manager
    HomeBrew
    Postico
--

# CLIENT SIDE

In Terminal, type the following commands:
--
    npx create-react-app sample-project-name --scripts-version 2.1.8
    cd sample-project-name
    touch .gitignore

    npm init --yes
    npm install
--

In .gitignore, ensure the following are present:
--
    .DS_Store
    /node_modules
--

In index.css and app.css, clear all styling.

In App.js, select all and replace with the following: 
--
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
--

Delete logo.svg
In Terminal, type the following command:
--
    npm start
--

If you see Hello World in the DOM, you are ready to build a simple client-side app.
--

## COMPONENTIZING THE CLIENT SIDE

In Terminal, type the following commands:
--
    cd src
    mkdir App
    mkdir SampleComponent
    cd SampleComponent
    touch SampleComponent.js
--

In SampleComponent, add the following code:
--
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
--

Move App.js, App.css, and App.test.js into the new App folder
In index.js, update the App import to the following:
--
    import App from './App/App.js';
--

In App.js, add the following code to the list of imports:
--
    import SampleComponent from '../SampleComponent/SampleComponent.js';
--

In App.js, add the following code to the return section (below Hello World):
--
    <SampleComponent/>
--

In Terminal, type the following commands:
--
    cd ../..
    npm start
--

If you see Hello World in the DOM, you are ready to build a simple client-side app.
--

# SERVER SIDE

In Terminal, type the following commands:
--
    npm install axios
    npm install express
    npm install body-parser
    mkdir server
    cd server
    touch server.js
--

In package.json, add the following line to the first section of the object:
--
    "proxy": "http://localhost:5000",
--

In package.json, select the "start" script and replace with the following:
--
    "start": "node server/server.js",
    "client": "react-scripts start",
    "server": "nodemon  --watch server server/server.js",
--

In App.js, add the following line to the imports:
--
    import axios from 'axios';
--

In App.js, add the following lines within the class App extends Component object:
--
    componentDidMount(){
    axios.get('/test')
    .then((response)=>{
        console.log(response.data);
    })
    }
--

In server.js, add the following lines of code:
--
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const PORT = process.env.PORT || 5000;

    /** ---------- MIDDLEWARE ---------- **/
    app.use(bodyParser.json()); // needed for axios requests
    // app.use(bodyParser.urlencoded({extended: true}));
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
--

In Terminal, type the following commands:
--
    ctrl+c
    npm run server
    cmd+t
    npm run client
--

If you see Hello from server in the console, you are ready to build a simple server-side app.
--

## COMPONENTIZING THE SERVER SIDE MIDDLEWARE

In Terminal, type the following commands:
--
    mkdir modules
    cd modules
    touch pool.js
--

Cut the pg/pool code block from server.js and paste it into pool.js
In pool.js, add the following line to the bottom of the file:
--
    module.exports = pool;
--

In server.js, add the following code to the middleware section:
--
    const pool = require('./modules/pool.js');
--

# COMPONENTIZING THE SERVER SIDE ROUTES

In Terminal, type the following commands:
--
    cd ..
    mkdir routes
    cd routes
    touch sample.router.js
--

In sample.router.js, enter the following code:
--
    const express = require('express');
    const router = express.Router();
    const pool = require('../modules/pool.js');

    module.exports = router;
--

Copy the GET request code block from server.js and paste int into the middle of sample.router.js (above module.exports)
Change app.get('/test') to router.get('/')
In server.js, add the following line of code to the routers section:
--
    const sampleRouter = require('./routes/sample.router.js');
    app.use('/test', sampleRouter);
--

# DATABASE

In Terminal, type the following commands:
--
    cd ..
    touch database.sql
    npm install pg
--

In server.js, add the following line to the middleware section:
--
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
--

In server.js, replace the res.send line with the following:
--
    let queryText = `SELECT * FROM "test_table";`
    pool.query(queryText)
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log(error);
    })
--

In database.sql, add the following lines:
--
    --DATABASE "sample_database_name"
    CREATE TABLE "test_table" (
        "id" SERIAL PRIMARY KEY,
        "content" TEXT NOT NULL
    );
    INSERT INTO "test_table" ("content") VALUES ('test');
--

In Postico, create the database "sample_database_name"
In SQL Query, copy+paste the CREATE TABLE script from above then click "Execute Statement"

In Terminal, type the following commands:
--
    cmd+t
    brew services start postgresql
--

If you see the array [{id: 1, content: "test"}] instead of "Hello from server" in the DOM console, you are ready to build a full-stack app.
--

# REDUX

## COMPONENTIZING REDUX

# SAGAS

## COMPONENTIZING SAGAS

# THIRD PARTY API

# VERSION CONTROL

Go to github.com and login
Click New to create a new repository
Enter the repository name: sample-project-name
Enter a description and select the desired privacy settings
Click Create Repository

In Terminal, enter the following commands:
--

--