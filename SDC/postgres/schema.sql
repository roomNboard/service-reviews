\c reviews;

CREATE TABLE property (
  id SERIAL PRIMARY KEY,
  property_name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  avatar VARCHAR(100) NOT NULL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL, 
  property_id INT NOT NULL, 
  text VARCHAR(1000) NOT NULL,
  date DATE NOT NULL,
  accuracy INT NOT NULL,
  communication INT NOT NULL,
  cleanliness INT NOT NULL,
  location INT NOT NULL,
  check_in INT NOT NULL,
  value INT NOT NULL
);


\COPY property (id,property_name) FROM '/media/brian/Iomega/csv/randomProperties.csv' DELIMITER ',' CSV HEADER;
\COPY users (id,username,avatar) FROM '/media/brian/Iomega/csv/randomUsers.csv' DELIMITER ',' CSV HEADER;
\COPY reviews (id,user_id,property_id,text,date,accuracy,communication,cleanliness,location,check_in,value) FROM '/media/brian/Iomega/csv/randomReviews.csv' DELIMITER ',' CSV HEADER;


ALTER TABLE reviews ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE reviews ADD CONSTRAINT property_fk FOREIGN KEY (property_id) REFERENCES property (id);