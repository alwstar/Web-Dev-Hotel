CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS weather (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description TEXT,
  temperature DECIMAL(5, 2) NOT NULL,
  humidity DECIMAL(5, 2) NOT NULL
);

INSERT INTO weather (description, temperature, humidity) VALUES 
('Cloudy with a chance of rain', 15.5, 0.82),
('Sunny and clear', 27.3, 0.60),
('Hot and dry', 35.0, 0.20),
('Windy with scattered showers', 18.4, 0.70);
