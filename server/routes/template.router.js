const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:search', (req, res) => {
  let search = req.params.search;
  console.log(search)
  axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9dcb268b4be0773e1ef7c3373f317a0a`)
    .then((response) => {
      console.log('api response', response.data);
      res.send(response.data);
    }).catch((err) => {
      console.log('Error in get', err);
    });
});

/**
 * GET route template
 */
router.get('/details', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const query = `
  SELECT impressions.id, "date", "movies_id", "impressions", "title", "genre", "image_url", "like", "director" FROM impressions
  JOIN movies ON movies.id = impressions.movies_id
  WHERE impressions.movies_id = $1
  ORDER BY date;`;
  console.log('get', req.query.id)
  pool.query(query, [req.query.id])
    .then(result => {
      console.log(result.rows)
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});

router.post('/details', (req, res) => {

  console.log(req.body)

  let movies_id = req.body.movies_id
  console.log('this is movie_id', movies_id)

  let date = req.body.date
  console.log(date)

  let impression = req.body.impression
  console.log(impression)
  
  const query = `
  INSERT INTO "impressions" ("date", "movies_id", "impressions")
  VALUES ($1, $2, $3);
  `;
  console
  pool.query(query, [date, movies_id, impression])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})


router.delete('/:id', (req, res) => {
  let id = req.params.id

  console.log(req.params);

  let queryText = `
  DELETE FROM "impressions"
  WHERE id= $1;`;

  let values = [id]
  pool.query(queryText, values)
    .then(results => {
      res.sendStatus(204)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});


router.put('/:id', (req, res) => {
  let id = req.params.id

  console.log(req.params.id)

  const queryText = `
  UPDATE "movies"
  SET "like" = NOT"like"
  WHERE id = $1;`;
  let values = [id]

  pool.query(queryText, values)
    .then(results => {
      res.sendStatus(204)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})


module.exports = router;
