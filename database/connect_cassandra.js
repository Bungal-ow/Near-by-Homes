const cassandra = require('cassandra-driver');
const async = require('async');
const assert = require('assert');

const client = new cassandra.Client({contactPoints:['127.0.0.1'], localDataCenter: 'datacenter1'});

client.connect(function (err) {
    assert.ifError(err);
});

const createKeyspace = () => {
    const query = "CREATE KEYSPACE IF NOT EXISTS bungalow WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3}";
    client.execute(query);
    console.log("created keyspace");
}

const createTable = () => {
    const query = "CREATE TABLE IF NOT EXISTS bungalow.houses (neighborhood VARCHAR, houseId INT, transit_score INT, walk_score INT, value_inc_dec_past INT, value_inc_dec_future INT, median_value INT, home_cost INT, bedrooms INT, bathrooms INT, home_address VARCHAR, sf INT, home_image VARCHAR, PRIMARY KEY (neighborhood, houseId))";
    client.execute(query);
    console.log("created table");
}

const promis = () => {
    return new Promise((resolve, reject) => {
        createKeyspace();
        resolve(createTable)
    })
}

promis().then((funct) =>{ funct()});

// const delay = async () => {
//     await createKeyspace();
//     await createTable();
//     return;
// }

// delay();






// //insert
// const query = 'INSERT INTO users (key, name, email, birthdate) VALUES (?, ?, ?)';
// const params = ['mick-jagger', 'Sir Mick Jagger', 'mick@rollingstones.com', new Date(1943, 6, 26)];
// client.execute(query, params, { prepare: true }, function (err) {
//   assert.ifError(err);
//   //Inserted in the cluster
// });

// // query
// const query = 'SELECT name, email, birthdate FROM users WHERE key = ?';
// // Set the prepare flag in your queryOptions
// client.execute(query, ['mick-jagger'], { prepare: true }, callback);