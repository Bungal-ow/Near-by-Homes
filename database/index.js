const { Client } = require('pg');

const client = new Client({
  database: 'mydb',
  port: 5432,
});

client.connect();

client.query('SELECT $1::text as message', ['Hello world!, from postgres'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message);
  client.end();
});

module.exports = { client };
