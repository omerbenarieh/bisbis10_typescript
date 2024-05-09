CREATE TABLE restaurant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    averageRating DECIMAL(2, 1) NOT NULL,
    isKosher BOOLEAN NOT NULL,
    cuisines TEXT[] NOT NULL
);


CREATE TABLE rating (
    id SERIAL PRIMARY KEY,
    restaurantId INT NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    FOREIGN KEY (restaurantId) REFERENCES restaurant(id)
);