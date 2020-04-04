const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

const csvWriter = createCsvWriter({
    path: './database/csv/neighborhood.csv',
    header: [
        {id: 'id', title: 'id'},
        {id: 'name', title: 'name'},
        {id: 'trans', title: 'trans'},
        {id: 'walk', title: 'walk'},
        {id: 'past', title: 'past'},
        {id: 'future', title: 'future'},
        {id: 'med', title: 'med'},
        
    ]
});

const makeNeighborhood = (pool) => {
    console.time('neighborhoodCSV')
    let records = [];
    for (let i = 0; i < pool; i++){
        const neighborhoods = faker.address.county()
        const transitScore = faker.random.number({ min: 70, max: 99 });
        const walkScore = faker.random.number({ min: 70, max: 99 });
        const valueIncDecPast = faker.random.number({ min: -3, max: 4 });
        const valueIncDecFuture = faker.random.number({ min: -3, max: 4 });
        const medianValue = faker.random.number({ min: 1100, max: 2200 }) * 1000;
        const record = {
            id: i,
            name: neighborhoods,
            trans: transitScore,
            walk: walkScore,
            past: valueIncDecPast,
            future: valueIncDecFuture,
            med: medianValue

        }
        records.push(record);
    }
    return records;
}

const recordsArray = makeNeighborhood(1000000)
csvWriter.writeRecords(recordsArray)
    .then(() => {
        console.log('Successfully generated CSV file for neighborhood')
        console.timeEnd('neighborhoodCSV')
    });