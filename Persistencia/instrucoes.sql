CREATE DATABASE sistema;

USE sistema;


CREATE TABLE marca(
    mar_codigo INT NOT NULL AUTO_INCREMENT,
    mar_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_marca PRIMARY KEY(mar_codigo)
);

CREATE TABLE carro(
    car_codigo INT NOT NULL AUTO_INCREMENT,
    car_nome VARCHAR(100) NOT NULL,
    car_valor DECIMAL(10,2) NOT NULL DEFAULT 0,
    car_anoFabricacao DATE,
    car_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    mar_codigo INT NOT NULL,
    CONSTRAINT pk_carro PRIMARY KEY(car_codigo)
);