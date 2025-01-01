CREATE DATABASE movies_db;
CREATE TABLE movies(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_data DATE NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    duration INT NOT NULL,
    description TEXT NOT NULL,
    filename VARCHAR(255) NOT NULL
);