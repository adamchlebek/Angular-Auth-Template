require('dotenv').config();

//Packages
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');

//App Vars
const app = express();
const port = process.env.PORT || 3000;
const mongoURL = 'mongodb://localhost:27017/'; //TODO: Place connection string here

//Setup App Settings
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

//Config
require('./config/mongoose');
require('./config/passport')(passport);

//Define App Routes
app.use("/api/auth", require("./routes/auth"));

//MongoDB Connection
mongoose.connect(mongoURL, { useNewUrlParser: true .valueOf}).then(() => { console.log('MongoDB Connected') }).catch((e) => { console.log(e) })

//Start Application
app.listen(port, () => { console.log(`Server up and listening on port ${port}!`) })

//Base Endpoint
app.get('/', (req, res) => {
    res.send({
        status: "Online"
    })
});
