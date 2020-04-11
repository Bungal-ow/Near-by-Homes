const faker = require('faker');
const model = require('./model.js');


const get_neighborhoods = (req, res) => {
    const FAKE = faker.random.number({ min: 1, max: 200000 });
    const { id } = req.params;
    model.get_neighborhoods(FAKE, (result) => {
        res.send(result);
    });
};

const get_houses = (req, res) => {
    const FAKE = faker.random.number({ min: 1, max: 200000 });
    const { neighborhood_id } = req.params;
    model.get_houses(FAKE, (result) => {
        res.send(result);
    });
};

const patch_house = (req, res) => {
    const { id, neighborhood_id } = req.params;
    model.patch_house(id, neighborhood_id, (updated) => {
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
    } = req.query;
    model.post_house(id, neighborhood_id,
    home_cost, bedrooms, bathrooms, home_address, sf, home_image, (result) => {
        const newId = result.id;
        res.send(`house ${newId} was created`);
    });
};

const delete_house = (req, res) => {
    const { id } = req.params;
    model.delete_house(id, (deleted) => {
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
