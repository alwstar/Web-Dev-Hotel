const express = require("express");
const cors = require('cors');
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Define URLs for other services
const roomServiceURL =    `http://${process.env.ROOM_SERVICE_NAME || localhost}:${process.env.ROOM_SERVICE_PORT || 3000}`;
const eventServiceURL =   `http://${process.env.EVENT_SERVICE_NAME || localhost}:${process.env.EVENT_SERVICE_PORT || 3001}`;
const videosServiceURL =  `http://${process.env.VIDEOS_SERVICE_NAME || localhost}:${process.env.VIDEOS_SERVICE_PORT || 3002}`;
const weatherServiceURL = `http://${process.env.WEATHER_SERVICE_NAME || localhost}:${process.env.WEATHER_SERVICE_PORT || 3003}`;
const orderServiceURL = `http://${process.env.ORDER_SERVICE_NAME || localhost}:${process.env.ORDER_SERVICE_PORT || 3004}`;


// Route to get all rooms
app.get("/rooms", async (req, res) => {
  try {
    const allRooms = await axios.get(`${roomServiceURL}`);
    res.json(allRooms.data);
  } catch (error) {
    console.error("Error fetching all rooms:", error.message);
    res.status(500).json({ error: "Failed to fetch all rooms" });
  }
});

// Route to get details of a specific room
app.get("/rooms/:id", async (req, res) => {
  const roomId = req.params.id;
  try {
    const roomDetails = await axios.get(`${roomServiceURL}/rooms/${roomId}`);
    res.json(roomDetails.data);
  } catch (error) {
    console.error(`Error fetching room details for ID ${roomId}:`, error.message);
    res.status(500).json({ error: `Failed to fetch room details for ID ${roomId}` });
  }
});

// Route to get room availability
app.get("/room-availability/:id", async (req, res) => {
  const roomId = req.params.id;
  try {
    const availability = await axios.get(`${roomServiceURL}/room-availability/${roomId}`);
    res.json(availability.data);
  } catch (error) {
    console.error(`Error fetching room availability for ID ${roomId}:`, error.message);
    res.status(500).json({ error: `Failed to fetch room availability for ID ${roomId}` });
  }
});

// Route to get all events
app.get("/events", async (req, res) => {
  try {
    const events = await axios.get(`${eventServiceURL}`);
    res.json(events.data);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Route to get details of a specific event
app.get("/events/:id", async (req, res) => {
  const eventId = req.params.id;
  try {
    const eventDetails = await axios.get(`${eventServiceURL}/events/${eventId}`);
    res.json(eventDetails.data);
  } catch (error) {
    console.error(`Error fetching event details for ID ${eventId}:`, error.message);
    res.status(500).json({ error: `Failed to fetch event details for ID ${eventId}` });
  }
});

// Route to get event availability
app.get("/event-availability/:id", async (req, res) => {
  const eventId = req.params.id;
  try {
    const availability = await axios.get(`${eventServiceURL}/event-availability/${eventId}`);
    res.json(availability.data);
  } catch (error) {
    console.error(`Error fetching event availability for ID ${eventId}:`, error.message);
    res.status(500).json({ error: `Failed to fetch event availability for ID ${eventId}` });
  }
});

// Route to get weather information
app.get("/weather", async (req, res) => {
  try {
    const weather = await axios.get(`${weatherServiceURL}`);
    res.json(weather.data);
  } catch (error) {
    console.error("Error fetching weather information:", error.message);
    res.status(500).json({ error: "Failed to fetch weather information" });
  }
});

// Route to get media (videos, event images, and room images)
app.get("/media", async (req, res) => {
  try {
    const [videos, eventImages, roomImages] = await Promise.all([
      axios.get(`${videosServiceURL}`),
      axios.get(`${eventServiceURL}/images`),
      axios.get(`${roomServiceURL}/images`)
    ]);

    const media = {
      videos: videos.data,
      eventImages: eventImages.data,
      roomImages: roomImages.data
    };

    res.json(media);
  } catch (error) {
    console.error("Error fetching media:", error.message);
    res.status(500).json({ error: "Failed to fetch media" });
  }
});

// Route for order service
app.post('/order', async (req, res) => {
  try {
    const { customer_name, address, mail, item } = req.body;

    // Validate input
    if (!customer_name || !address || !mail || !item) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Forward the request to the order service
    const response = await axios.post(`${orderServiceURL}/`, {
      customer_name,
      address,
      mail,
      item
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
