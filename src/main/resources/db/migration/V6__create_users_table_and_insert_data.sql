-- Create users table
CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       created_at TIMESTAMP NOT NULL,
                       updated_at TIMESTAMP NOT NULL,
                       name VARCHAR(255) NOT NULL,
                       surname VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       username VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       role VARCHAR(255) NOT NULL DEFAULT 'ROLE_USER'
);

-- Insert sample user data
INSERT INTO users (created_at, updated_at, name, surname, email, username, password, role)
VALUES
    (now(), now(), 'John',   'Doe',     'john.doe@example.com',       'john_doe',     '$2a$10$GII17NrocGXrBCsMjuomg.6NYLahXV0.g1cstoTiVotQZMu5putjy', 'ROLE_USER'),
    (now(), now(), 'Jane',   'Smith',   'jane.smith@example.com',     'jane_smith',   '$2a$10$GII17NrocGXrBCsMjuomg.6NYLahXV0.g1cstoTiVotQZMu5putjy', 'ROLE_USER'),
    (now(), now(), 'Alice',  'Johnson', 'alice.johnson@example.com',  'alice_johnson','$2a$10$GII17NrocGXrBCsMjuomg.6NYLahXV0.g1cstoTiVotQZMu5putjy', 'ROLE_USER'),
    (now(), now(), 'Bob',    'Brown',   'bob.brown@example.com',      'bob_brown',    '$2a$10$GII17NrocGXrBCsMjuomg.6NYLahXV0.g1cstoTiVotQZMu5putjy', 'ROLE_ADMINISTRATOR');

-- Reset sequence for users table
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users) + 1);