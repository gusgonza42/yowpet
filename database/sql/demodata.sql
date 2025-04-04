-- Insert demo data for users
INSERT INTO users (firstname, lastname, email, password, address, rol, telephone, gender, state, postalcode, birthdate,
                   emergencynum, paymentmethod, latitud, longitud)
VALUES ('Alice', 'Smith', 'alice@example.com', 'hashedpassword1', '123 Street, City', 'user', '1234567890', 'female',
        'active', '10001', '1990-01-01', '9876543210', 'tarjeta', 40.7128, -74.0060),
       ('Bob', 'Johnson', 'bob@example.com', 'hashedpassword2', '456 Avenue, City', 'caregiver', '0987654321', 'male',
        'active', '10002', '1985-05-15', '8765432109', 'buzime', 34.0522, -118.2437),
       ('Charlie', 'Brown', 'charlie@example.com', 'hashedpassword3', '789 Blvd, City', 'admin', '1231231234', 'male',
        'active', '10003', '1992-08-22', '7654321098', 'tarjeta', 51.5074, -0.1278),
       ('Daisy', 'Miller', 'daisy@example.com', 'hashedpassword4', '101 Lane, City', 'user', '2345678901', 'female',
        'active', '10004', '1995-12-11', '6543210987', 'buzime', 48.8566, 2.3522),
       ('Ethan', 'Hunt', 'ethan@example.com', 'hashedpassword5', '202 Road, City', 'caregiver', '3456789012', 'male',
        'inactive', '10005', '1988-07-30', '5432109876', 'tarjeta', -33.8688, 151.2093),
       ('Fiona', 'Clark', 'fiona@example.com', 'hashedpassword6', '303 Circle, City', 'user', '4567890123', 'female',
        'active', '10006', '1997-09-15', '4321098765', 'buzime', 35.6895, 139.6917),
       ('George', 'Lee', 'george@example.com', 'hashedpassword7', '404 Way, City', 'user', '5678901234', 'male',
        'active', '10007', '1993-04-05', '3210987654', 'tarjeta', 37.7749, -122.4194),
       ('Hannah', 'Taylor', 'hannah@example.com', 'hashedpassword8', '505 Path, City', 'caregiver', '6789012345',
        'female', 'inactive', '10008', '1991-06-20', '2109876543', 'buzime', 55.7558, 37.6173),
       ('Ian', 'Moore', 'ian@example.com', 'hashedpassword9', '606 Trail, City', 'user', '7890123456', 'male', 'active',
        '10009', '1986-03-12', '1098765432', 'tarjeta', 41.9028, 12.4964),
       ('Jane', 'White', 'jane@example.com', 'hashedpassword10', '707 Drive, City', 'admin', '8901234567', 'female',
        'active', '10010', '1999-11-25', '9876543210', 'buzime', 52.5200, 13.4050);

-- Insert demo data for animal_categoria
INSERT INTO animal_categoria (name)
VALUES ('Dog'),
       ('Cat'),
       ('Bird'),
       ('Rabbit'),
       ('Fish'),
       ('Hamster'),
       ('Turtle'),
       ('Snake'),
       ('Horse'),
       ('Lizard');

-- Insert demo data for animals
INSERT INTO animals (name, categoria)
VALUES ('Golden Retriever', 1),
       ('Persian Cat', 2),
       ('Parrot', 3),
       ('Bunny', 4),
       ('Goldfish', 5),
       ('Dwarf Hamster', 6),
       ('Red-Eared Slider', 7),
       ('Python', 8),
       ('Arabian Horse', 9),
       ('Gecko', 10);

-- Insert demo data for places
INSERT INTO places (name, address, addresscode)
VALUES ('Central Park', '123 Park Ave, City', 'P1001'),
       ('Pet Hospital', '456 Vet St, City', 'P1002'),
       ('Dog Park', '789 Bark Blvd, City', 'P1003'),
       ('Cat Café', '101 Meow Lane, City', 'P1004'),
       ('Animal Shelter', '202 Rescue Rd, City', 'P1005'),
       ('Zoo', '303 Safari Circle, City', 'P1006'),
       ('Reptile House', '404 Slither Way, City', 'P1007'),
       ('Fish Aquarium', '505 Swim Path, City', 'P1008'),
       ('Horse Stable', '606 Gallop Trail, City', 'P1009'),
       ('Pet Store', '707 Treat Drive, City', 'P1010');

INSERT INTO pets (users_id, animal_id, name, birthdate, gender, strlization)
VALUES (1, 1, 'Buddy', '2020-05-10', 'male', 'yes'),
       (2, 2, 'Whiskers', '2019-06-15', 'female', 'no'),
       (3, 3, 'Polly', '2021-02-01', 'female', 'yes'),
       (4, 4, 'Thumper', '2018-11-20', 'male', 'no'),
       (5, 5, 'Goldie', '2022-07-07', 'female', 'yes'),
       (6, 6, 'Hammy', '2021-09-09', 'male', 'no'),
       (7, 7, 'Speedy', '2017-03-30', 'female', 'yes'),
       (8, 8, 'Slither', '2020-12-25', 'male', 'no'),
       (9, 9, 'Thunder', '2016-08-17', 'male', 'yes'),
       (10, 10, 'Scaly', '2019-04-22', 'female', 'no');

INSERT INTO pets (users_id, animal_id, name, birthdate, gender, strlization)
VALUES
    (1, 1, 'Buddy', '2020-05-10', 'male', 'yes'),
    (2, 2, 'Whiskers', '2019-06-15', 'female', 'no'),
    (3, 3, 'Polly', '2021-02-01', 'female', 'yes'),
    (4, 4, 'Thumper', '2018-11-20', 'male', 'no'),
    (5, 5, 'Goldie', '2022-07-07', 'female', 'yes'),
    (6, 6, 'Hammy', '2021-09-09', 'male', 'no'),
    (7, 7, 'Speedy', '2017-03-30', 'female', 'yes'),
    (8, 8, 'Slither', '2020-12-25', 'male', 'no'),
    (9, 9, 'Thunder', '2016-08-17', 'male', 'yes'),
    (10, 10, 'Scaly', '2019-04-22', 'female', 'no');

-- Insert demo data for reservations
INSERT INTO reservations (user_id, caregiver_id, pet_id, reservation_date, status)
VALUES (1, 2, 3, '2025-04-10 10:00:00', 'pending'),
       (2, 3, 4, '2025-04-11 11:30:00', 'confirmed'),
       (3, 4, 5, '2025-04-12 09:15:00', 'completed'),
       (4, 5, 6, '2025-04-13 14:45:00', 'cancelled'),
       (5, 6, 7, '2025-04-14 16:30:00', 'pending'),
       (6, 7, 8, '2025-04-15 08:00:00', 'confirmed'),
       (7, 8, 9, '2025-04-16 12:20:00', 'completed'),
       (8, 9, 10, '2025-04-17 15:10:00', 'pending'),
       (9, 10, 1, '2025-04-18 10:50:00', 'confirmed'),
       (10, 1, 2, '2025-04-19 13:40:00', 'completed');


