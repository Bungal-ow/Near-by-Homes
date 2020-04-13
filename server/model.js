const { client } = require('../database');

const get_neighborhoods = (neigh_id, callback) => {
    client.query(`SELECT * FROM neighborhoods WHERE id = ${neigh_id}`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            callback(res.rows[0]);
        }
    });
};

const get_houses = (neigh_id, callback) => {
    client.query(`SELECT * FROM houses WHERE neighborhood_id = ${neigh_id} LIMIT 12`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            callback(res.rows);
        }
    });
};

const patch_house = (house_id, neigh_id, callback) => {
    client.query(`UPDATE houses SET neighborhood_id = ${neigh_id} WHERE id = ${house_id}`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            callback(res);
        }
    });
};

const post_house = (id, neighborhood_id, home_cost, bedrooms, bathrooms, home_address, sf, home_image, callback) => {
    const query = `INSERT INTO houses VALUES(${id}, ${neighborhood_id}, ${home_cost}, ${bedrooms}, ${bathrooms}, ${home_address}, ${sf}, ${home_image}, ${callback}`
    client.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            callback(result);
        }
    });
};

const delete_house = (id_toDelete, callback) => {
    client.query(`DELETE FROM houses WHERE id = ${id_toDelete}`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            callback(res);
        }
    });
};

module.exports = {
    get_houses,
    get_neighborhoods,
    patch_house,
    post_house,
    delete_house,
};
