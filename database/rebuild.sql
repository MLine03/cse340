DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS classification CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TYPE IF EXISTS account_type;

CREATE TYPE account_type AS ENUM (
  'Client',
  'Admin'
);

CREATE TABLE account (
  account_id SERIAL PRIMARY KEY,
  account_firstname VARCHAR(50) NOT NULL,
  account_lastname VARCHAR(50) NOT NULL,
  account_email VARCHAR(255) UNIQUE NOT NULL,
  account_password VARCHAR(255) NOT NULL,
  account_type account_type DEFAULT 'Client'
);

CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(50) NOT NULL
);

CREATE TABLE inventory (
  inv_id SERIAL PRIMARY KEY,
  inv_make VARCHAR(50) NOT NULL,
  inv_model VARCHAR(50) NOT NULL,
  inv_description TEXT NOT NULL,
  inv_image VARCHAR(255) NOT NULL,
  inv_thumbnail VARCHAR(255) NOT NULL,
  classification_id INT REFERENCES classification(classification_id)
);

INSERT INTO classification (classification_name)
VALUES
  ('Sport'),
  ('SUV'),
  ('Truck');

INSERT INTO inventory (
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  classification_id
)
VALUES
(
  'GM',
  'Hummer',
  'This vehicle has small interiors but extreme power.',
  '/images/hummer.jpg',
  '/images/hummer-tn.jpg',
  2
),
(
  'Ferrari',
  '488',
  'Fast and stylish sports car.',
  '/images/ferrari.jpg',
  '/images/ferrari-tn.jpg',
  1
),
(
  'Porsche',
  '911',
  'High-performance sport vehicle.',
  '/images/porsche.jpg',
  '/images/porsche-tn.jpg',
  1
);

-- Required final queries from assignment2.sql

UPDATE inventory
SET inv_description = REPLACE(
  inv_description,
  'small interiors',
  'a huge interior'
)
WHERE inv_make = 'GM'
  AND inv_model = 'Hummer';

UPDATE inventory
SET
  inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
  inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
