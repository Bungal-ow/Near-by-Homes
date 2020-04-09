const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const controller = require('./controller.js');

const port = 3001;
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
  controller.get(req, res);
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


// app.get('/api/neighborhoods', (req, res) => {
//   db.getThisNeighborhoodData(req.query.name)
//   .then((results) => res.status(200).json(results))
//   .catch((err) => {
//     throw err;
//   });
// });


// // handle vale: houseId
// app.get('/api/houses', (req, res) => {
//   if (req.query.name) {
//     db.getAllNeighborhoodHouses(req.query.name)
//     .then((results) => res.status(200).json(results))
//     .catch((err) => {
//       throw err;
//     });
//   } else if (req.query.houseId) {
//     db.getHeartData(req.query.houseId)
//     .then((results) => res.status(200).json(results))
//     .catch((err) => {
//       throw err;
//     });
//   } else {
//     db.getAllHouseData()
//     .then((results) => res.status(200).json(results))
//     .catch((err) => {
//       throw err;
//     });
//   }
// });

// // handle vale: houseId
// app.get('/api/houses', (req, res) => {
//   db.getAllHouseData()
//   .then((results) => res.status(200).json(results))
//   .catch((err) => {
//     throw err;
//   });
// });

// // handle vale: houseId
// app.put('/api/houses/', (req, res) => {
//   db.updateHeart(req.body.params.houseId)
//   .then((results) => res.status(200).json(results))
//   .catch((err) => {
//     throw err;
//   });
// });

// app.get('/api/test/:id', (req, res) => {
//   console.log(req.params)
//   res.send('test is working')
// })
