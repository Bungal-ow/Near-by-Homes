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
    // console.log("created keyspace");
}

const createTable = () => {
    const query = "CREATE TABLE IF NOT EXISTS bungalow.houses (neighborhood VARCHAR, houseId INT, transit_score INT, walk_score INT, value_inc_dec_past INT, value_inc_dec_future INT, median_value INT, home_cost INT, bedrooms INT, bathrooms INT, home_address VARCHAR, sf INT, home_image VARCHAR, PRIMARY KEY (neighborhood, houseId))";
    client.execute(query);
    console.log("created table");
}

// const insertData = () => {
//     const query = "COPY bungalow.houses (neighborhood, houseId, transit_score, walk_score, value_inc_dec_past, value_inc_dec_future, median_value, home_cost, bedrooms, bathrooms, home_address, sf, home_image) FROM '/Users/peteboxes/Documents/Hack Reactor/Bungal-ow/abode-similar-homes-monthly-cost-neighborhood-facts/database/csv/cassandra_neighborhood.csv' WITH DELIMITER=',' AND HEADER=TRUE"
//     client.execute(query);
//     console.log('injected data');
// }


const promis = () => {
    return new Promise((resolve, reject) => {
        createKeyspace();
        console.log('created keyspace')
        resolve(createTable)
    })
}


promis()
    .then(funct => {return funct();})


// const delay = async () => {
//     await createKeyspace();
//     await createTable();
//     return;
// }

// delay();
