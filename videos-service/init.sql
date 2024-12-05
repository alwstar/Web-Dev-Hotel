CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(255)
);

INSERT INTO videos (image_url) VALUES 
('https://www.youtube.com/embed/bDOlGwbmdF4?si=ORC3-xyqEMDXBup4'),
('https://www.youtube.com/embed/mT0RNrTDHkI?si=TfkN-pl5Hs4BWR2E');
