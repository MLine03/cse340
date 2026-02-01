-- ==========================
-- Reset the database tables
-- ==========================

DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS car_classifications;

-- ==========================
-- Create car_classifications table
-- ==========================
CREATE TABLE car_classifications (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) NOT NULL UNIQUE
);

-- ==========================
-- Create inventory table
-- ==========================
CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50) NOT NULL,
    inv_model VARCHAR(50) NOT NULL,
    inv_year INT NOT NULL,
    classification_id INT REFERENCES car_classifications(classification_id),
    inv_price NUMERIC(10,2),
    inv_miles INT,
    inv_color VARCHAR(20),
    inv_description TEXT,
    inv_image VARCHAR(255)
);

-- ==========================
-- Insert sample classifications
-- ==========================
INSERT INTO car_classifications (classification_name) VALUES
('Cars'),
('Trucks'),
('SUVs');

-- ==========================
-- Insert sample inventory
-- ==========================
INSERT INTO inventory (inv_make, inv_model, inv_year, classification_id, inv_price, inv_miles, inv_color)
VALUES
('Toyota', 'Camry', 2020, 1, 24000, 12000, 'Blue'),
('Honda', 'Civic', 2021, 1, 22000, 8000, 'Black'),
('Ford', 'F-150', 2019, 2, 30000, 25000, 'Red'),
('Chevrolet', 'Silverado', 2022, 2, 35000, 5000, 'White'),
('Jeep', 'Grand Cherokee', 2020, 3, 40000, 15000, 'Green');
