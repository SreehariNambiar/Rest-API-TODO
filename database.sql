CREATE DATABASE authtodolist;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--users
CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,

    PRIMARY KEY (user_id)
);

--todo

CREATE TABLE todos(
    todo_id SERIAL,
    user_id UUID,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);