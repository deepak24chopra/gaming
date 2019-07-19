const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const cookieParser = require('cookie-parser');
const md5 = require('md5');
const path = require('path');

const app = express();

const dbName = 'gaming';
const url = "mongodb://localhost:27017";
var db;

mongo.MongoClient.connect(url, { useNewUrlParser: true }, function(err, Client) {
    if (err) {
        console.log(err);
    }
    console.log("Successfully connected to database.");
    db = Client.db(dbName);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    req.db = db;
    next();
});

const users = require('./modules/users.js');


//api url
app.post("/api/users/signin", users.signin);
app.post("/api/users/signup", users.signup);
app.post("/api/users/all", users.getAll);


app.listen(3000, function() {
    console.log("Server is running at port 3000");
});