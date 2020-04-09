// this file creates CSV for cassandra database.

const faker = require('faker');
const fs = require('fs');
const { streetSuff, neighborhoods_names } = require('./premade_text.js')

const writeUsers = fs.createWriteStream('./database/csv/cassandra_neighborhood.csv');
writeUsers.write('neighborhoodId,houseId,neighborhood,transit_score, walk_score, value_inc_dec_past, value_inc_dec_future, median_value, home_cost, bedrooms, bathrooms, home_address, sf, home_image\n', 'utf8');

function writeTenMillionUsers(writer, encoding, callback) {
  let i = 10000000;
  let houseIndex = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      houseIndex += 1;
      const neighborhoodId = faker.random.number({ min: 1, max: 200000 });
      const neighborhoods = neighborhoods_names[faker.random.number({ min: 0, max: (neighborhoods_names.length - 1) })];
      const transitScore = faker.random.number({ min: 70, max: 99 });
      const walkScore = faker.random.number({ min: 70, max: 99 });
      const valueIncDecPast = faker.random.number({ min: -3, max: 4 });
      const valueIncDecFuture = faker.random.number({ min: -3, max: 4 });
      const medianValue = faker.random.number({ min: 1100, max: 2200 }) * 1000;
      const homeCost = Math.round((medianValue * (Math.random() * (0.2 - (-0.2)) + 0.3) * 2) / 1000) * 1000;
      const bedrooms = faker.random.number({ min: 3, max: 6 });
      const bathrooms = bedrooms - faker.random.number({ min: 1, max: 2 });
      const homeAddress = faker.address.streetName() + ' ' + streetSuff[Math.floor(Math.random() * streetSuff.length)];
      const sf = bedrooms * faker.random.number({ min: 750, max: 950 });
      // for home_image the pre-url is https://bungal-ow.s3-us-west-1.amazonaws.com/p{ home_image}.jpg
      const home_image = `${faker.random.number({ min: 1, max: 429 })}`;
      const data = `${neighborhoodId},${houseIndex},${neighborhoods},${transitScore},${walkScore},${valueIncDecPast},${valueIncDecFuture},${medianValue},${homeCost},${bedrooms},${bathrooms},${homeAddress},${sf},${home_image}\n`;
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
