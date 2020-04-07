const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');
const { streetSuff, neighborhoods_names } = require('./premade_text.js')


let houseIndex = 1;

const generateCSV = (fileNum) => {
    const csvWriter = createCsvWriter({
    path: `./database/csv/cassandra_neighborhood${fileNum}.csv`,
    header: [
        {id: 'neighborhood', title: 'neighborhood'},
        {id: 'houseId', title: 'houseId'},
        {id: 'transit_score', title: 'transit_score'},
        {id: 'walk_score', title: 'walk_score'},
        {id: 'value_inc_dec_past', title: 'value_inc_dec_past'},
        {id: 'value_inc_dec_future', title: 'value_inc_dec_future'},
        {id: 'median_value', title: 'median_value'},
        {id: 'home_cost', title: 'home_cost'},
        {id: 'bedrooms', title: 'bedrooms'},
        {id: 'bathrooms', title: 'bathrooms'},
        {id: 'home_address', title: 'home_address'},
        {id: 'sf', title: 'sf'},
        {id: 'home_image', title: 'home_image'},
        
    ]
    });

    const makeNeighborhood = (pool) => {
        let records = [];
        for (let i = 1; i <= pool; i++){
            const neighborhoods = neighborhoods_names[faker.random.number({ min: 0, max: (neighborhoods_names.length -1)})]
            const transitScore = faker.random.number({ min: 70, max: 99 });
            const walkScore = faker.random.number({ min: 70, max: 99 });
            const valueIncDecPast = faker.random.number({ min: -3, max: 4 });
            const valueIncDecFuture = faker.random.number({ min: -3, max: 4 });
            const medianValue = faker.random.number({ min: 1100, max: 2200 }) * 1000;
            const homeCost = Math.round((medianValue * (Math.random() * (0.2 - (-0.2)) + 0.3) * 2)/1000)*1000;
            const bedrooms = faker.random.number({ min: 3, max: 6 });
            const bathrooms = bedrooms - faker.random.number({ min: 1, max: 2 });
            const homeAddress = faker.address.streetName() + ' ' + streetSuff[Math.floor(Math.random() * streetSuff.length)];
            const sf = bedrooms * faker.random.number({ min: 750, max: 950 });
            // for home_image the pre-url is https://bungal-ow.s3-us-west-1.amazonaws.com/p{ home_image}.jpg
            const home_image = `${faker.random.number({ min: 1, max: 429 })}`
            const record = {
                neighborhood: neighborhoods,
                houseId: houseIndex,
                transit_score: transitScore,
                walk_score: walkScore,
                value_inc_dec_past: valueIncDecPast,
                value_inc_dec_future: valueIncDecFuture,
                median_value: medianValue,
                home_cost: homeCost,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                home_address: homeAddress,
                sf: sf,
                home_image: home_image
                
            }
            houseIndex ++;
            records.push(record);
        }
        return records;
    }

    console.time('neighborhoodCSV')

    const batch = makeNeighborhood(10)
    console.log(`Successfully generated CSV file for neighborhood part ${fileNum}`)


    csvWriter.writeRecords(batch).then(()=>{})
    console.timeEnd('neighborhoodCSV')

}

