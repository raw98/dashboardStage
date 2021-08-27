var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var User = require('./models/User');
var cors = require('cors');

var app = express();

app.use(cors());

var db = mongoose.connect('mongodb://localhost:27017/testingdb', function(err, response) {
    if(err) console.log("An error occured while connecting to the database.");
    console.log("Successfully connected to the database");
});

app.set('port', process.env.port ||3000);
app.use(bodyparser.json());

app.get('/', (req,res) => {
    res.send('hello world');
});
/*
app.post('/register', (req,res) => {
    console.log(req.body);
    var name = req.body.name ;
    var email = req.body.email ;
    var password = req.body.password ;

    var user = new User();
    user.name = name ;
    user.email = email ;
    user.password = password ;

    user.save((err, result) => {
        if (err) {
            console.log("An error occured while adding user to the database");
            res.send({success: "Failed to add user", status:500});
        }
        res.send({success: "User added successfully", status:200});
    })

});
*/
app.listen(app.get('port'), function(err, response) {
    console.log("Server is running on port",app.get('port'));
});