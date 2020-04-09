const model = require('./model.js');

const get = (req, res) => {
  model.get(req, (result) => {
    res.send(result);
  });
};

module.exports = { get };
