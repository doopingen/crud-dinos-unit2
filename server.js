const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const fs = require('fs');
const methodOverride = require('method-override');

//Standin for database. Stored in simple file
const app = express();

//View engine. Is what reads all the code, replaces it with data and sends page out
app.set('view engine', 'ejs');

//Preferred layout 
app.use(ejsLayouts);

//Setup static directory in which everything will live
app.use(express.static('static'));

//Takes every form submission and sticks it into req.body
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', function(req, res) {
    res.send('you hit the root route')
});

app.use('/dinosaurs', require('./routes/dinosaurs'));

app.use('/cryptids', require('./routes/cryptids'));

app.listen(3000, function() {
    console.log("Server listening on 3000")
});



