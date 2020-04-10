const model = require('./model.js');

const get_neighborhoods = (req, res) => {
    const neigh_id = req.query.id;
    model.get_neighborhoods(neigh_id, (result) => {
        res.send(result);
    });
};

const get_houses = (req, res) => {
    const neigh_id = req.query.neighborhood_id;
    model.get_houses(neigh_id, (result) => {
        res.send(result);
    });
};

const patch_house = (req, res) => {
    const house_id = req.query.id;
    const neigh_id = req.query.neighborhood_id;
    model.patch_house(house_id, neigh_id, (updated) => {
        const houseId = updated.id;
        const neighborhood = updated.neighborhood_id;
        res.send(`House #${houseId} has been updated\n This house is now listed in neighborhood id${neighborhood}`);
    });
};

const post_house = (req, res) => {
    const {
        id,
        neighborhood_id,
        home_cost,
        bedrooms,
        bathrooms,
        home_address,
        sf,
        home_image,
    } = req;
    model.post_house(id, neighborhood_id,
    home_cost, bedrooms, bathrooms, home_address, sf, home_image, (result) => {
        const newId = result.id;
        res.send(`house ${newId} was created`);
    });
};

const delete_house = (req, res) => {
    const id_toDelete = req.query.id;
    model.delete_house(id_toDelete, (deleted) => {
        res.send(`delete house id${deleted}`);
    });
};

module.exports = {
    get_houses,
    get_neighborhoods,
    patch_house,
    post_house,
    delete_house,
};
