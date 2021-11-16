const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  const movieQuery = `
  INSERT INTO "movies" ("title", "genre", "image_url", "like", "director")
  VALUES ($1, $2, $3, $4, $5)
  RETURNING "id";`;

  pool.query(movieQuery, [req.body.title, req.body.genre, req.body.image_url, req.body.like, req.body.director])
    .then(result => {
      console.log(result.rows)
      res.sendStatus(201)

    }).catch(err => {
      console.log('err', err)
    });
})

module.exports = router;
