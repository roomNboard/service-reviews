\c reviews;

CREATE TABLE property (
  id SERIAL PRIMARY KEY,
  property_name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(15) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  avatar VARCHAR(100) NOT NULL
);

--create indexing for each type of review (accuracy ,communication, etc...)--
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL, 
  property_id INT NOT NULL, 
  text VARCHAR(1000) NOT NULL, --testing text vs varchar--
  date DATE NOT NULL,
  accuracy INT NOT NULL,
  communication INT NOT NULL,
  cleanliness INT NOT NULL,
  location INT NOT NULL,
  check_in INT NOT NULL,
  value INT NOT NULL
);

--create indexing for each type of review (accuracy, communication, etc...)--
-- CREATE TABLE property_reviews (
--   id INT NOT NULL REFERENCES property (id),
--   total_reviews INT NOT NULL,
--   average_accuracy DECIMAL(2, 1),
--   average_communication DECIMAL(2, 1),
--   average_cleanliness DECIMAL(2, 1),
--   average_location DECIMAL(2, 1),
--   average_checkin DECIMAL(2, 1),
--   average_value DECIMAL(2, 1)
-- );


\COPY property (id,property_name) FROM '/media/brian/Iomega/csv/randomProperties.csv' DELIMITER ',' CSV HEADER;
\COPY users (id,first_name,last_name,avatar) FROM '/media/brian/Iomega/csv/randomUsers.csv' DELIMITER ',' CSV HEADER;
\COPY reviews (id,user_id,property_id,text,date,accuracy,communication,cleanliness,location,check_in,value) FROM '/media/brian/Iomega/csv/randomReviews.csv' DELIMITER ',' CSV HEADER;


ALTER TABLE reviews ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE reviews ADD CONSTRAINT property_fk FOREIGN KEY (property_id) REFERENCES property (id);