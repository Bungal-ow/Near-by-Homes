\c postgres;
DROP DATABASE IF EXISTS bungalow;
CREATE DATABASE bungalow;
\c bungalow;

CREATE TABLE neighborhoods (
    id SERIAL PRIMARY KEY,
    neighborhood VARCHAR (40) NOT NULL,
    transit_score INTEGER NOT NULL,
    walk_score INTEGER NOT NULL,
    value_inc_dec_past INTEGER NOT NULL,
    value_inc_dec_future INTEGER NOT NULL,
    median_value INTEGER NOT NULL
);

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







-- Below code is to create the foreign key. Do not uncomment the code and run. Either copy it to psql or run it from a seperat file.
-- ALTER TABLE houses ADD CONSTRAINT neighborhood_fk FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods (id);

    