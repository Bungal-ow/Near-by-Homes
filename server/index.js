/* eslint-disable prefer-template */
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const path = require('path');

const port = 3001;
const app = express();

// eslint-disable-next-line prefer-template
// eslint-disable-next-line no-path-concat
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/api/neighborhoods', (req, res) => {
  db.getThisNeighborhoodData(req.query.name)
  .then((results) => res.status(200).json(results))
  .catch((err) => {
    throw err;
  });
});

// handle vale: houseId
app.get('/api/houses', (req, res) => {
  if (req.query.name) {
    db.getAllNeighborhoodHouses(req.query.name)
    .then((results) => res.status(200).json(results))
    .catch((err) => {
      throw err;
    });
  } else if (req.query.houseId) {
    db.getHeartData(req.query.houseId)
    .then((results) => res.status(200).json(results))
    .catch((err) => {
      throw err;
    });
  } else {
    db.getAllHouseData()
    .then((results) => res.status(200).json(results))
    .catch((err) => {
      throw err;
    });
  }
});

// handle vale: houseId
app.get('/api/houses', (req, res) => {
  db.getAllHouseData()
  .then((results) => res.status(200).json(results))
  .catch((err) => {
    throw err;
  });
});

// handle vale: houseId
app.put('/api/houses', (req, res) => {
  console.log('here')
  db.updateHeart(req.body.params.houseId)
  .then((results) => res.status(200).json(results))
  .catch((err) => {
    throw err;
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
