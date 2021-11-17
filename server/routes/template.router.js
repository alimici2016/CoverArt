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
  const query = `
  SELECT "date", "movies_id", "impressions", "title", "genre", "image_url", "like", "director" FROM impressions
  JOIN movies ON movies.id = impressions.movies_id;`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});


router.delete('/:movies_id', (req, res) => {
  let id = req.params.movies_id

  console.log(req.params.movies_id);

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




// router.put('/:id', (req,res) => {
//   let id = req.params.id

//   console.log(req.params.id)

//   const queryText = `
//   UPDATE "impressions" `
// })


module.exports = router;
