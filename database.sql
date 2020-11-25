--CREATE DATABASE meraki;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE category(
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE item(
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    category_id INT,
    description VARCHAR(255),
    price INT,
    img VARCHAR(255),
    stock INT
);

CREATE TABLE item_comment(
    item_comment_id SERIAL PRIMARY KEY,
    person VARCHAR,
    title VARCHAR(255),
    description VARCHAR(255),
    id_item INT
);