CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255),
  date DATE NOT NULL
);

INSERT INTO events (name, description, price, image_url, date) VALUES 
('Tech Conference', 'A conference showcasing the latest in tech innovations.', 99.99, 'http://localhost:9010/images/event-1.jpg', '2024-09-15'),
('Music Festival', 'A weekend of live music performances from various artists.', 249.99, 'http://localhost:9010/images/event-2.jpg', '2024-08-22'),
('Art Exhibition', 'An exhibition of modern art by renowned artists.', 49.99, 'http://localhost:9010/images/event-3.jpg', '2024-07-30'),
('Food Fair', 'A fair featuring a variety of gourmet food and beverages.', 149.99, 'http://localhost:9010/images/event-4.jpg', '2024-10-05');
