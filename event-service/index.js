const express = require("express");
const cors = require('cors');
const mysql = require("mysql2/promise");
const Minio = require('minio');
const fs = require('fs');
const path = require('path');


const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

const minioBucketName = "images";
const imagesDir = "./images/";
let fileNames = [];


fs.readdir(imagesDir, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  } 
  fileNames = files;
});

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_HOST || "localhost",
  port: parseInt(process.env.MINIO_PORT, 10) || 9000,
  useSSL: false,
  accessKey: process.env.MINIO_USER || "root",
  secretKey: process.env.MINIO_PASSWORD || "password"
});

minioClient.bucketExists(minioBucketName, function (err, exists) {
  if (err) {
    return console.log('Error checking bucket existence.', err);
  }
  if (!exists) {
    minioClient.makeBucket(minioBucketName, 'us-east-1', function (err) {
      if (err) return console.log('Error creating bucket.', err);
      console.log('Bucket created successfully.');
      setBucketPolicy(minioBucketName);
      uploadFiles();
    });
  } else {
    setBucketPolicy(minioBucketName);
    uploadFiles();
  }
});

function uploadFiles() {
  fileNames.forEach(fileName => {
    minioClient.fPutObject(minioBucketName, fileName, imagesDir + fileName, function (err, etag) {
      if (err) return console.log('Error uploading file.', err);
      console.log('File uploaded successfully. ETag:', etag);
    });
  });
}

function setBucketPolicy(bucketName) {
  // Define the bucket policy
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: ["*"]
        },
        Action: [
          "s3:GetBucketLocation",
          "s3:ListBucket"
        ],
        Resource: [`arn:aws:s3:::${bucketName}`]
      },
      {
        Effect: "Allow",
        Principal: {
          AWS: ["*"]
        },
        Action: "s3:GetObject",
        Resource: [`arn:aws:s3:::${bucketName}/*`]
      }
    ]
  };

  // Convert the policy to JSON
  const policyJson = JSON.stringify(policy);

  // Set the bucket policy
  minioClient.setBucketPolicy(bucketName, policyJson, (err) => {
    if (err) {
      return console.log('Error setting bucket policy:', err);
    }
    console.log(`Bucket policy set successfully for bucket: ${bucketName}`);
  });
};

const con = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "mydatabase",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/", async (req, res) => {
  try {
    const [rows] = await con.query("SELECT * FROM events");
    res.json(rows);
  } catch (err) {
    console.error("Error querying events:", err);
    res.status(500).json({ error: JSON.stringify(err) });
  }
});

app.get("/events/:id", async (req, res) => {
  const eventId = req.params.id;
  
  try {
    const [eventsRows] = await con.query("SELECT * FROM events WHERE id = ?", [eventId]);
    if (eventsRows.length === 0) {
      return res.status(404).json({ error: "event not found" });
    }

    const event = eventsRows[0];
    event.price = parseFloat(event.price);

    res.json(event);
  } catch (err) {
    console.error("Error querying event details:", err);
    res.status(500).json({ error: JSON.stringify(err) });
  }
});

app.get("/event-availability/:id", async (req, res) => {
  try {
    const isAvailable = Math.random() >= 0.5
    res.json(isAvailable);
  } catch (err) {
    console.error("Error getting event availability:", err);
    res.status(500).json({ error: JSON.stringify(err) });
  }
});

app.get("/images", async (req, res) => {
  try {
    const [rows] = await con.query("SELECT id, image_url FROM events");
    res.json(rows);
  } catch (err) {
    console.error("Error querying events:", err);
    res.status(500).json({ error: JSON.stringify(err) });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
