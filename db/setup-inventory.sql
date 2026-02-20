CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    classification_id INT,
    make VARCHAR(50),
    model VARCHAR(50),
    year INT,
    price DECIMAL,
    mileage INT,
    description TEXT,
    image TEXT
);

INSERT INTO inventory (classification_id, make, model, year, price, mileage, description, image)
VALUES
(1, 'Toyota', 'Camry', 2022, 25000, 15000, 'Reliable midsize sedan', '/images/camry.jpg'),
(1, 'Honda', 'Civic', 2023, 22000, 5000, 'Compact car with great mileage', '/images/civic.jpg');
