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
    item_image BYTEA NOT NULL -- image URL--
);

INSERT INTO users (username, password) VALUES
  ('username', 'password'),
  ('username2', 'password')
  ;

INSERT INTO posts (user_id, item_name, item_price, item_info, item_image) VALUES
  (1, 'Kitten', 0, 'Adorable ginger kitten looking for new home', 'URL HERE'),
  (2, 'Air Pods', 60, 'Like new', 'URL HERE'),
  (1, 'iPhone', 220, 'Doesnt work', 'URL HERE')
;

COMMIT;
