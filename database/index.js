/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
const mysql = require('mysql');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'b2024520245',
  database: 'abode',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the mySQL database');
});

const getThisNeighborhoodData = (neighborhood) => {
  return new Promise((resolve, reject) => {
    const queryStr = `SELECT * FROM neighborhoods WHERE neighborhood = "${neighborhood}"`;
    connection.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getAllNeighborhoodData = (neighborhood) => {
  return new Promise((resolve, reject) => {
    const queryStr = 'SELECT * FROM neighborhoods';
    connection.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getAllHouseData = () => {
  return new Promise((resolve, reject) => {
    const queryStr = 'SELECT * FROM houses';
    connection.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getAllNeighborhoodHouses = (neighborhood) => {
  return new Promise((resolve, reject) => {
    const queryStr = `SELECT * FROM houses WHERE neighborhood = "${neighborhood}"`;
    connection.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const updateHeart = (houseId) => {
  return new Promise((resolve, reject) => {
    const queryStr = `UPDATE houses SET heart_filled = !heart_filled WHERE id = "${houseId}"`;
    connection.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getHeartData = (id) => {
  return new Promise((resolve, reject) => {
    const queryStr = `SELECT heart_filled FROM houses WHERE id = "${id}"`;
    connection.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  connection,
  getThisNeighborhoodData,
  getAllNeighborhoodData,
  getAllHouseData,
  getAllNeighborhoodHouses,
  updateHeart,
  getHeartData,
};
