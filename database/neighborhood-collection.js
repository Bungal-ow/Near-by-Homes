const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

const neighborhoods = [
    'South of Market',
    'Financial District',
    'Civic Center',
    'Noe Valley',
    'Haight-Ashbury',
    'Fillmore',
    'Nob Hill',
    'Pacific Heights',
    'Richmond',
    'Sunset',
    'The Mission',
    'Laurel Heights',
    'North Beach',
    'The Castro',
];

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

const makeNeighborhood = () => {
    console.time('neighborhoodCSV')
    let records = [];
    for (let i = 0; i < neighborhoods.length; i++){
        const transitScore = faker.random.number({ min: 70, max: 99 });
        const walkScore = faker.random.number({ min: 70, max: 99 });
        const valueIncDecPast = faker.random.number({ min: -3, max: 4 });
        const valueIncDecFuture = faker.random.number({ min: -3, max: 4 });
        const medianValue = faker.random.number({ min: 1100, max: 2200 }) * 1000;
        const record = {
            id: i,
            name: neighborhoods[i],
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

const recordsArray = makeNeighborhood()
csvWriter.writeRecords(recordsArray)
    .then(() => {
        console.log('Successfully generated CSV file for neighborhood')
        console.timeEnd('neighborhoodCSV')
    });