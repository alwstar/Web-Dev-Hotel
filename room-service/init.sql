CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255)
);

INSERT INTO rooms (name, description, price, image_url) VALUES 
('Business Suite', 'An elegant suite blending contemporary style with luxury, offering panoramic views and plush furnishings.', 99.99, 'http://localhost:9000/images/room-1.jpg'),
('Modern Suite', 'A modern suite featuring sleek, futuristic designs with integrated technology and ambient lighting.', 119.99, 'http://localhost:9000/images/room-2.jpg'),
('Rustic Suite', 'A classic suite with rich wooden decor and intricate details, exuding a warm and inviting atmosphere.', 129.99, 'http://localhost:9000/images/room-3.jpg'),
('Royal Suite', 'A lavish suite with opulent decorations, featuring grand chandeliers, exquisite furnishings, and a regal ambiance.', 149.99, 'http://localhost:9000/images/room-4.jpg');
