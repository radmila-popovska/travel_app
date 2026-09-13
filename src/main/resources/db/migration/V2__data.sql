INSERT INTO countries(id, created_at, updated_at, name, continent)
VALUES
    (1,  now(), now(), 'Germany',        'Europe'),
    (2,  now(), now(), 'Italy',          'Europe'),
    (3,  now(), now(), 'USA',            'North America'),
    (4,  now(), now(), 'France',         'Europe'),
    (5,  now(), now(), 'Spain',          'Europe'),
    (6,  now(), now(), 'Japan',          'Asia'),
    (7,  now(), now(), 'Brazil',         'South America'),
    (8,  now(), now(), 'Australia',      'Oceania'),
    (9,  now(), now(), 'Canada',         'North America'),
    (10, now(), now(), 'Portugal',       'Europe');

INSERT INTO hosts(id, created_at, updated_at, name, surname, country_id)
VALUES
    (1,  now(), now(), 'John',      'Doe',          3),
    (2,  now(), now(), 'Mario',     'Rossi',        2),
    (3,  now(), now(), 'Mark',      'Smith',        3),
    (4,  now(), now(), 'Hans',      'Müller',       1),
    (5,  now(), now(), 'Sophie',    'Dubois',       4),
    (6,  now(), now(), 'Carlos',    'García',       5),
    (7,  now(), now(), 'Yuki',      'Tanaka',       6),
    (8,  now(), now(), 'Ana',       'Silva',        7),
    (9,  now(), now(), 'Liam',      'Johnson',      8),
    (10, now(), now(), 'Emily',     'Brown',        9);

INSERT INTO accommodations(id, created_at, updated_at, name, category, num_rooms, condition, rented, host_id)
VALUES
    (1,  now(), now(), 'City Apartment',          'APARTMENT', 3,  'GOOD',      false, 1),
    (2,  now(), now(), 'Sea House',               'HOUSE',     5,  'BAD',       false, 2),
    (3,  now(), now(), 'Budget Motel',            'MOTEL',     10, 'GOOD',      false, 3),
    (4,  now(), now(), 'Berlin Loft',             'APARTMENT', 2,  'BAD', false, 4),
    (5,  now(), now(), 'Paris Studio',            'APARTMENT', 1,  'GOOD',      true,  5),
    (6,  now(), now(), 'Barcelona Beach House',   'HOUSE',     6,  'BAD', false, 6),
    (7,  now(), now(), 'Tokyo Capsule Inn',        'MOTEL',     20, 'GOOD',      true,  7),
    (8,  now(), now(), 'Rio Penthouse',            'APARTMENT', 4,  'GOOD', false, 8),
    (9,  now(), now(), 'Sydney Harbor Villa',      'HOUSE',     7,  'BAD',      true,  9),
    (10, now(), now(), 'Maple Cottage',            'HOUSE',     3,  'GOOD',      false, 10);

SELECT setval('countries_id_seq',      (SELECT MAX(id) FROM countries)      + 1);
SELECT setval('hosts_id_seq',          (SELECT MAX(id) FROM hosts)          + 1);
SELECT setval('accommodations_id_seq',  (SELECT MAX(id) FROM accommodations)  + 1);