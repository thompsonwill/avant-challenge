DROP DATABASE IF EXISTS avant;
CREATE DATABASE avant;
USE avant;

CREATE TABLE card(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    card_number BIGINT NOT NULL,
    credit_limit INTEGER(10) NOT NUll,
    APR INTEGER(3) NOT NUll,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    balance DECIMAL(5, 2) NOT NUll,
    PRIMARY KEY(id)
);

CREATE TABLE transactions(
    transID INTEGER(11) AUTO_INCREMENT NOT NULL,
    amount DECIMAL(5, 2) NOT NUll,
    ownerID INTEGER(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(transID),
    FOREIGN KEY (ownerID) REFERENCES card(id)
);
USE avant;
SELECT * FROM transactions;
SELECT * FROM card;

INSERT INTO card (card_number, credit_limit, APR, balance)
VALUES (4916057945040918, 10000, 35, 100);


INSERT INTO transactions (amount, ownerID) VALUES (100, 1);
INSERT INTO transactions (amount, ownerID) VALUES (-500.25, 1);
INSERT INTO transactions (amount, ownerID) VALUES (-35.75, 1);

INSERT INTO transactions (amount, ownerID) VALUES (35.75, 2);


SELECT * FROM transactions WHERE ownerID = 1;
