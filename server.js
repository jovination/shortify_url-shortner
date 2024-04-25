
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

        // Make a POST request to the shortener API
        const response = await axios.post(
            'https://shrtlnk.dev/api/v2/link',
            { url: originalUrl },
            {
                headers: {
                    'api-key': apiKey,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );

        // Extract response data
        const { url, key, shrtlnk } = response.data;

        // Send the response with the shortened URL
        res.json({ url, key, shrtlnk });
    } 
    
    catch (error) {
        // Handle error response
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            res.status(error.response.status).json({ message: error.response.data.message });
        } else if (error.request) {
            // The request was made but no response was received
            res.status(500).json({ message: 'No response received from server' });
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(500).json({ message: error.message });
        }
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
