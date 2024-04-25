const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // npm install node-fetch
const shortid = require('shortid');
const connectDB = require('./config/db');

const app = express();

// Connect Database
//connectDB(); // Uncomment this line if you have a database connection function

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define API key
const apiKey = 'AamxlsFiIi5YMnYPTvqJSo9JYmofJPAE8KAURCahszlU7'; // Replace 'Your_API_Key' with your actual API key

// POST endpoint to shorten a URL
app.post('/api/v2/link', async (req, res) => {
    try {
        // Get the URL from the request body
        const originalUrl = req.body.url;

        const response = await fetch('https://shrtlnk.dev/api/v2/link', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: originalUrl })
        });

        // Check if response is successful
        if (!response.ok) {
            throw new Error('Failed to shorten URL');
        }

        // Parse the JSON response
        const data = await response.json();

        // Extract response data
        const { url, key, shrtlnk } = data;

        // Send the response with the shortened URL
        res.json({ url, key, shrtlnk });
    } catch (error) {
        // Handle error response
        res.status(500).json({ message: error.message });
    }
});

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Route to render the index page
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
