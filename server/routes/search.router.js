const axios = require('axios')
const express = require('express');
const pool = require('../modules/pool');
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

router.post('/', (req, res) => {
  const query = `
  INSERT INTO "wish_list" ("release_date", "title", "poster_path", "overview")
  VALUES ($1, $2, $3, $4);
  `;
  console
  pool.query(query, [req.body.release_date, req.body.title, req.body.poster_path, req.body.overview])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})


module.exports = router;