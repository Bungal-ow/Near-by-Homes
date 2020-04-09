const db = require('../database');

const get = (req, callback) => {
  db.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      callback(res);
    }
  });
};

module.exports = { get };
