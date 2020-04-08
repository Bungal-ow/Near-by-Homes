// this file creates CSV file for neighborhoods data.

const faker = require('faker');
const fs = require('fs');
const { neighborhoods_names } = require('./premade_text.js')

const writeUsers = fs.createWriteStream('./database/csv/postgres_neighborhood.csv');
writeUsers.write('id, neighborhood,transit_score, walk_score, value_inc_dec_past, value_inc_dec_future, median_value\n', 'utf8');

function writeTenMillionUsers(writer, encoding, callback) {
  let i = 29;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const neighborhoods = neighborhoods_names[i];
      const transitScore = faker.random.number({ min: 70, max: 99 });
      const walkScore = faker.random.number({ min: 70, max: 99 });
      const valueIncDecPast = faker.random.number({ min: -3, max: 4 });
      const valueIncDecFuture = faker.random.number({ min: -3, max: 4 });
      const medianValue = faker.random.number({ min: 1100, max: 2200 }) * 1000;

      const data = `${id},${neighborhoods},${transitScore},${walkScore},${valueIncDecPast},${valueIncDecFuture},${medianValue}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
