const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './test.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'lang', title: 'LANGUAGE'}
    ]
});

const records = [
    {name: 'Bob', lang: 'French, English'},
    {name: 'Mary', lang: 'English'}
];

csvWriter.writeRecords(records)
    .then(() => {
        console.log('FIRST CSV')
    });