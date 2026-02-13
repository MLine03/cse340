-- Drop tables if they exist
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS account;

-- Create account table
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create inventory table
CREATE TABLE inventory (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    price DECIMAL(10,2) NOT NULL
);

-- Create review table
CREATE TABLE review (
    review_id SERIAL PRIMARY KEY,
    account_id INT REFERENCES account(account_id),
    item_id INT REFERENCES inventory(item_id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for accounts
INSERT INTO account (username, email) VALUES
('alice', 'alice@example.com'),
('bob', 'bob@example.com'),
('carol', 'carol@example.com');

-- Insert sample data for inventory
INSERT INTO inventory (item_name, quantity, price) VALUES
('Laptop', 10, 999.99),
('Headphones', 50, 79.99),
('Mouse', 100, 19.99);

-- Insert sample data for reviews
INSERT INTO review (account_id, item_id, rating, comment) VALUES
(1, 1, 5, 'Excellent laptop!'),
(2, 2, 4, 'Good sound quality'),
(3, 3, 3, 'Average mouse, but works');
