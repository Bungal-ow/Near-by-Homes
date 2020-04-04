const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

const csvWriter = createCsvWriter({
    path: './database/csv/house.csv',
    header: [
        {id: 'id', title: 'id'},
        {id: 'name', title: 'name'},
        {id: 'cost', title: 'cost'},
        {id: 'beds', title: 'beds'},
        {id: 'baths', title: 'baths'},
        {id: 'address', title: 'address'},
        {id: 'sf', title: 'sf'},
        {id: 'img', title: 'img'},
        {id: 'heart', title: 'heart'}
        
    ]
});


const records = [];

csvWriter.writeRecords(records)
    .then(() => {
        console.log('FIRST CSV')
    });