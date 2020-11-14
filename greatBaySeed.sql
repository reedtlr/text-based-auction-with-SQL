DROP DATABASE IF EXISTS auction_db;

CREATE DATABASE auction_db;

USE auction_db;

CREATE TABLE listings (
  id INT NOT NULL AUTO_INCREMENT,
  item VARCHAR(50) NOT NULL,
  currentbid INT DEFAULT (10) NOT NULL,
  highestbid INT DEFAULT (0) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO listings (item, currentbid, highestbid)
VALUES ("PS5", 2000, 0), ("old thinkpad", 480, 0)

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);