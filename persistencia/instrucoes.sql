USE sistema;

CREATE TABLE category(
    cat_id INT NOT NULL AUTO_INCREMENT,
    cat_name VARCHAR(20) NOT NULL,
    cat_description VARCHAR(100) NOT NULL,
    CONSTRAINT pk_category PRIMARY KEY(cat_id)
);

CREATE TABLE supplier(
    sup_id INT NOT NULL AUTO_INCREMENT,
    sup_document VARCHAR(20) NOT NULL,
    sup_name VARCHAR(20) NOT NULL,
    sup_phoneNumber VARCHAR(20) NOT NULL,
    sup_email VARCHAR(50) NOT NULL,
    sup_website VARCHAR(50) NOT NULL,
    sup_description VARCHAR(100) NOT NULL,
    CONSTRAINT pk_supplier PRIMARY KEY(sup_id)
);

CREATE TABLE product(
    prod_id INT NOT NULL AUTO_INCREMENT,
    prod_name VARCHAR(20) NOT NULL,
    prod_description VARCHAR(100) NOT NULL,
    prod_unitPrice DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_stockQuantity INT NOT NULL DEFAULT 0,
    prod_brand VARCHAR(20) NOT NULL,
    prod_model VARCHAR(20) NOT NULL,
    prod_manufacturingDate DATE,
    cat_id INT NOT NULL, 
    sup_id INT NOT NULL,
    CONSTRAINT pk_product PRIMARY KEY(prod_id),
    CONSTRAINT fk_prod_category FOREIGN KEY(cat_id) REFERENCES category (cat_id),
    CONSTRAINT fk_prod_supplier FOREIGN KEY(sup_id) REFERENCES supplier (sup_id)
);

CREATE TABLE client(
    cli_id INT NOT NULL AUTO_INCREMENT,
    cli_document VARCHAR(11) NOT NULL,
    cli_name VARCHAR(20) NOT NULL,
    cli_neighborhood VARCHAR(20) NOT NULL,
    cli_address VARCHAR(20) NOT NULL,
    cli_city VARCHAR(20) NOT NULL,
    cli_uf VARCHAR(2) NOT NULL,
    cli_number VARCHAR (5) NOT NULL,
    cli_zipCode VARCHAR(8) NOT NULL
)