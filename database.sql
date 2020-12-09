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
    description TEXT,
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

CREATE TABLE password_admin(
    password_admin_id SERIAL PRIMARY KEY,
    ps_code VARCHAR(30)
);

INSERT INTO password_admin (ps_code) 
VALUES ('');

-- Arriba en VALUES, entre las comillas iría la contraseña de admin por defecto