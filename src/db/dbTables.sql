CREATE TABLE Cars (
  "_id" SERIAL PRIMARY KEY,
  "vin" VARCHAR NOT NULL UNIQUE,
  "year" INT NOT NULL,
  "make" VARCHAR NOT NULL,
  "model" VARCHAR NOT NULL,
  "license_plate" VARCHAR NOT NULL,
  "registration_number" VARCHAR NOT NULL,
  "registration_state" VARCHAR NOT NULL,
  "registration_expiration" DATE NOT NULL,
  "registration_name" VARCHAR NOT NULL,
  "value" INT NOT NULL,
  "mileage" INT NOT NULL,
  "description" VARCHAR,
  "color" VARCHAR NOT NULL,
  "date_added" DATE DEFAULT CURRENT_DATE,
  "last_updated" DATE NOT NULL
)

-- test data entered into db below:

-- INSERT INTO Cars
-- VALUES (DEFAULT, 'JH4CC2650NC000393', 1992, 'ACURA', 'Vigor', 'ABC123', 'R12345', 'California', '2023-08-25', 'Test User', 30000, 16851, 'test description', 'white', DEFAULT, current_timestamp)
-- RETURNING *
