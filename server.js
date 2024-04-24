
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

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Route to render the index page
app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle POST requests for URL shortening
app.post('/shorten-url', async (req, res) => {
    try {
        // Extract the URL from the request body
        const originalUrl = req.body.url;

        // Add your URL shortening logic here
        // For example, you can generate a short ID using shortid package
        const shortId = shortid.generate();

        // Construct the shortened URL using the short ID
        const shortenedUrl = `http://yourdomain.com/${shortId}`;

        // You can also store the original URL and its corresponding shortened URL in your database

        // Send the shortened URL back to the client
        res.json({ originalUrl, shortId, shortenedUrl });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
