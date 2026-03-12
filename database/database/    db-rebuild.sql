-- ================================================
-- DATABASE REBUILD SQL - SAFE VERSION
-- ================================================

-- Step 1: Drop ENUM type if it exists
DO $$
BEGIN
   IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'account_type') THEN
      DROP TYPE account_type CASCADE;
   END IF;
END$$;

-- Step 2: Create ENUM type
CREATE TYPE account_type AS ENUM ('Client', 'Employee', 'Admin');

-- Step 3: Create classification table
CREATE TABLE IF NOT EXISTS classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR NOT NULL
);

-- Step 4: Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
    inventory_id SERIAL PRIMARY KEY,
    inv_make VARCHAR NOT NULL,
    inv_model VARCHAR NOT NULL,
    inv_description VARCHAR,
    inv_image VARCHAR,
    inv_thumbnail VARCHAR,
    classification_id INT NOT NULL REFERENCES classification(classification_id)
);

-- Step 5: Create account table
CREATE TABLE IF NOT EXISTS account (
    account_id SERIAL PRIMARY KEY,
    account_firstname VARCHAR NOT NULL,
    account_lastname VARCHAR NOT NULL,
    account_email VARCHAR NOT NULL,
    account_password VARCHAR NOT NULL,
    account_type account_type NOT NULL DEFAULT 'Client'::account_type
);

-- Step 6: Sample data inserts for classification
INSERT INTO classification (classification_name) VALUES
('Sedan'), ('SUV'), ('Sport'), ('Truck');

-- Step 7: Sample data inserts for inventory
INSERT INTO inventory (inv_make, inv_model, inv_description, inv_image, inv_thumbnail, classification_id)
VALUES
('GM', 'Hummer', 'small interiors', '/images/hummer.jpg', '/images/hummer-thumb.jpg', 3),
('Ford', 'Mustang', 'fast sports car', '/images/mustang.jpg', '/images/mustang-thumb.jpg', 3);

-- Step 8: Task 1 Queries 4 & 6 (Updates)
-- Update GM Hummer description
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Update all image paths
UPDATE inventory
SET 
    inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');