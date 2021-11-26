const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { Description } = require('@mui/icons-material');

router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  // SELECT FROM movies
  // WHERE id = $1 AND
  // user_id = $2;
  // `;
  // let values = [id, req.user.id]
  const query = ` SELECT * FROM "movies"
  ORDER BY "like" DESC;`;
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
    INSERT INTO "movies" ("title", "genre", "image_url", "like", "director", "streaming_service", "description")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING "id";`;

  pool.query(movieQuery, [req.body.title, req.body.genre, req.body.image_url, req.body.like, req.body.director, req.body.streaming_service, req.body.description])
    .then(result => {
      console.log('new row here', result.rows[0].id)

      const createdMovieId = result.rows[0].id

      const movieImpressionQuery = `
            INSERT INTO "impressions" ("date", "movies_id", "impressions")
            VALUES  ($1, $2, $3);
            `;
      pool.query(movieImpressionQuery, [req.body.date, createdMovieId, req.body.impressions])
        .then(result => {
          res.sendStatus(201)
        }).catch(err => {
          res.sendStatus(500)
          console.log(err);
        })
    }).catch(err => {
      res.sendStatus(500)
      console.log('err', err)
    });
});


router.delete('/:id', (req, res) => {
  let id = req.params.id

  console.log(req.params.id);

  let queryText = `
    DELETE FROM "movies"
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
    UPDATE impressions
  SET impressions = $1
  WHERE movies_id = $2;`;
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