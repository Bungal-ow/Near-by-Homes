\c postgres;
DROP DATABASE IF EXISTS bungalow;
CREATE DATABASE bungalow;
\c bungalow;

DROP TABLE IF EXISTS neighborhoods;
CREATE TABLE neighborhoods (
    id SERIAL PRIMARY KEY,
    neighborhood VARCHAR (40) NOT NULL,
    transit_score INTEGER NOT NULL,
    walk_score INTEGER NOT NULL,
    value_inc_dec_past INTEGER NOT NULL,
    value_inc_dec_future INTEGER NOT NULL,
    median_value INTEGER NOT NULL
);


-- COPY neighborhoods (id, neighborhood, transit_score, walk_score, value_inc_dec_past, value_inc_dec_future, median_value) FROM '/Users/peteboxes/Documents/hackReactor/Bungal-ow/neighborhoods/database/csv/postgres_neighborhood.csv' DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS houses;
CREATE TABLE houses (
    id SERIAL PRIMARY KEY,
    neighborhood_id INTEGER,
    home_cost INTEGER NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    home_address VARCHAR (100) NOT NULL,
    sf INTEGER NOT NULL,
    home_image VARCHAR (100) NOT NULL
);

-- COPY houses (id, neighborhood_id, home_cost, bedrooms, bathrooms, home_address, sf, home_image) FROM '/Users/peteboxes/Documents/hackReactor/Bungal-ow/neighborhoods/database/csv/postgres_houses.csv' DELIMITER ',' CSV HEADER;






-- Below code is to create the foreign key. Do not uncomment the code and run. Either copy it to psql or run it from a seperat file.
-- ALTER TABLE houses ADD CONSTRAINT neighborhood_fk FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods (id);

    