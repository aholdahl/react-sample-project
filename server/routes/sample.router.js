const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    console.log('Received GET request from client');
    // res.send('Hello from server');
    let queryText = `SELECT * FROM "test_table";`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
        })
})

module.exports = router;