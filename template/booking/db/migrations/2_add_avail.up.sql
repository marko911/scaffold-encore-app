CREATE TABLE availability (
    weekday SMALLINT NOT NULL PRIMARY KEY, -- Sunday=0, Monday=1, etc.
    start_time TIME NULL, -- null indicates not available
    end_time TIME NULL -- null indicates not available
);

-- Add some placeholder availability to get started
INSERT INTO availability (weekday, start_time, end_time) VALUES
    (0, '09:30', '17:00'),
    (1, '09:00', '17:00'),
    (2, '09:00', '18:00'),
    (3, '08:30', '18:00'),
    (4, '09:00', '17:00'),
    (5, '09:00', '17:00'),
    (6, '09:30', '16:30');
