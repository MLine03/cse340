-- ============================
-- Assignment 2 - Full SQL
-- Task 2: Rebuild Database + Task 1 Queries
-- ============================

-- Step 1: Drop old tables and type if they exist
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS classification CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TYPE IF EXISTS account_type;

-- Step 2: Create custom ENUM type
CREATE TYPE account_type AS ENUM ('Client', 'Admin');

-- Step 3: Create tables

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

-- Step 4: Populate classification table
INSERT INTO classification (classification_name)
VALUES
  ('Sport'),
  ('SUV'),
  ('Truck');

-- Step 5: Populate inventory table
INSERT INTO inventory (
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  classification_id
)
VALUES
('GM','Hummer','This vehicle has small interiors but extreme power.','/images/hummer.jpg','/images/hummer-tn.jpg',2),
('Ferrari','488','Fast and stylish sports car.','/images/ferrari.jpg','/images/ferrari-tn.jpg',1),
('Porsche','911','High-performance sport vehicle.','/images/porsche.jpg','/images/porsche-tn.jpg',1);

-- ============================
-- Task 1 Queries
-- ============================

-- 1. Insert Tony Stark
INSERT INTO account (
  account_firstname,
  account_lastname,
  account_email,
  account_password
)
VALUES (
  'Tony',
  'Stark',
  'tony@starkent.com',
  'Iam1ronM@n'
);

-- 2. Update Tony Stark to Admin
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- 3. Delete Tony Stark
DELETE FROM account
WHERE account_email = 'tony@starkent.com';

-- 4. Update GM Hummer description using REPLACE
UPDATE inventory
SET inv_description = REPLACE(
  inv_description,
  'small interiors',
  'a huge interior'
)
WHERE inv_make = 'GM'
  AND inv_model = 'Hummer';

-- 5. Select using INNER JOIN (Sport category)
SELECT
  i.inv_make,
  i.inv_model,
  c.classification_name
FROM inventory i
INNER JOIN classification c
  ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- 6. Update image paths
UPDATE inventory
SET
  inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
  inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
