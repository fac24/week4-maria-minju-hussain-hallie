BEGIN;

DROP TABLE IF EXISTS users, sessions, posts CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE sessions(
    sid VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    data JSON NOT NULL
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    item_name VARCHAR(255) NOT NULL UNIQUE,
    item_price decimal(12,2) NOT NULL,
    item_info TEXT NOT NULL,
    item_image TEXT NOT NULL -- image URL--
);

COMMIT;
