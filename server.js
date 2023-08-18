const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
 res.render('index')

})

app.use(express.static('public'));
app.listen(process.env.PORT || 5000);

//my fuction codes are HERE

