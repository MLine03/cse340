-- seedAccounts.sql
-- Inserts required accounts for Assignment 5

-- Client Account
INSERT INTO accounts (firstname, lastname, email, password, account_type)
VALUES (
    'Basic', 
    'User', 
    'basic@340.edu', 
    '$2a$10$XwK4f5Kc1lF1ZfU4p/8yCekE2y0h5R6G8v5fYyP6sZ3Fv1B8G9Jw', 
    'Client'
);

-- Employee Account
INSERT INTO accounts (firstname, lastname, email, password, account_type)
VALUES (
    'Happy', 
    'User', 
    'happy@340.edu', 
    '$2a$10$8Z4k1bJ6qF7G4Tz1XyP7UeQ8y7x4R2k9Jc9pZ2u1vX4L5B6T3K8a', 
    'Employee'
);

-- Admin Account
INSERT INTO accounts (firstname, lastname, email, password, account_type)
VALUES (
    'Manager', 
    'User', 
    'manager@340.edu', 
    '$2a$10$9K6v2L3sR8H5B7U1YxT4WeQ3a1y0V7m8Zq3tX2l5C4P1K6J9B2Yq', 
    'Admin'
);