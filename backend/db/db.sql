-- for help \?

-- list db \l

--create database CREATE DATABASE <name>

CREATE TABLE category (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE CHECK(name <> ''),
    image VARCHAR(100) NOT NULL UNIQUE,
    
);
CREATE TABLE sub_category (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    category_id BIGINT REFERENCES category(id) NOT NULL,
    name VARCHAR(50) NOT NULL UNIQUE CHECK(name <> ''),
    image VARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE product (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    category_id BIGINT REFERENCES category(id) NOT NULL,
    sub_category_id BIGINT REFERENCES sub_category(id) NOT NULL,
    name VARCHAR(70) NOT NULL UNIQUE CHECK(name <> ''),
    description VARCHAR(200) NOT NULL CHECK(description <> ''),
    alergens VARCHAR(70) NOT NULL,
    price INT NOT NULL CHECK(price > 0 AND price <> ''),
    image VARCHAR(100) NOT NULL
);
CREATE TABLE _order (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    table_number INT NOT NULL
);
CREATE TABLE order_product (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    order_id BIGINT REFERENCES _order(id) NOT NULL,
    prod_name VARCHAR(70) NOT NULL,
    prod_price INT NOT NULL,
    prod_quantity INT NOT NULL 
);
