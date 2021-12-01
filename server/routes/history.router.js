const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    const query = ` SELECT * FROM "movie_history";`;
    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all movies', err);
            res.sendStatus(500)
        })
})

module.exports = router;