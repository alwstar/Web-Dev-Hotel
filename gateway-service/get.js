const axios = require('axios');

// Define the URL for the GET request
const url = 'http://localhost:3000/rooms/3'; // Replace with your actual endpoint

// Function to make the GET request
async function fetchData() {
  try {
    const response = await axios.get(url);
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the fetchData function
fetchData();