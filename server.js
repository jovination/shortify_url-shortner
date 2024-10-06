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
app.use(express.json());

app.post('/api/v2/link', async (req, res) => {
    try {
        const originalUrl = req.body.url;
        console.log(originalUrl)

        if (!originalUrl) {
            return res.status(400).json({ message: 'URL is required' });
        }

        const isGdApiUrl = `https://is.gd/create.php?format=json&url=${encodeURIComponent(originalUrl)}`;

        const response = await fetch(isGdApiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`is.gd API responded with status ${response.status}`);
        }

        const data = await response.json();

        if (data.errorcode && data.errorcode !== 0) {
            throw new Error(data.errormessage || 'Error shortening the URL');
        }

        res.json({ shortUrl: data.shorturl });
    } catch (error) {
        console.error('Error:', error.message);
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
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
