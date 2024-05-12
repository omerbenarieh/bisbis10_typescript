CREATE TABLE restaurant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    averageRating DECIMAL(2, 1) NOT NULL,
    isKosher BOOLEAN NOT NULL,
    cuisines TEXT[] NOT NULL
);


CREATE TABLE rating (
    id SERIAL PRIMARY KEY,
    restaurantId INT NOT NULL REFERENCES restaurant(id),
    rating DECIMAL(2, 1) NOT NULL
);


CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    restaurantId INT NOT NULL REFERENCES restaurant(id),
    orderItems JSONB NOT NULL
);


CREATE TABLE dish (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    restaurantId INT NOT NULL REFERENCES restaurant(id),
    UNIQUE (restaurantId, name)
);