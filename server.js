const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
//connectDB();
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
 res.render('index')

})

app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 5000);

//my fuction codes are HERE

