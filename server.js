var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var comments=[{"id": 1, "author": "Pete Hunt", "text": "This is one comment"},
    {"id": 2, "author": "Jordan Walke", "text": "This is *another* comment"},
    {"id": 3, "author": "Zizy Walke", "text": "This is *another* comment"}
];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/test',function(req,res){
    res.send("Hello this is a test!! ");
});

app.get('/comments',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    //res.send(" ");


    res.send(comments);
});

app.post('/comments',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

     comments=comments.concat(req.body);
    res.send(comments);
});



var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});