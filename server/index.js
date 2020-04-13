require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const controller = require('./controller.js');

const port = 3001;
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// get information on a neighborhood.
app.get('/api/neighborhoods/:id', (req, res) => {
  controller.get_neighborhoods(req, res);
});

// get 12 related homes.
app.get('/api/houses/:home_cost', (req, res) => {
  controller.get_houses(req, res);
});

// update house's price.
app.patch('/api/houses/:id', (req, res) => {
  controller.patch_house(req, res);
});

// add a new home to the database.
app.post('/api/houses', (req, res) => {
  controller.post_house(req, res);
});

// delete a hone from the database.
app.delete('/api/houses/:id', (req, res) => {
  controller.delete_house(req, res);
});


app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
