var express = require('express');
var bodyParser = require('body-parser');
var sqlite = require('sqlite3');

var db = new sqlite.Database('database.db');
var quotes = [
    {
        id: 1,
        quote: "The best is yet to come",
        author: "Unknown",
        year: 2000
    },
    {
        id: 2,
        quote: "This is a quote",
        author: "First Last",
        year: 1930
    },
    {
        id: 3,
        quote: "This is another quote",
        author: "First2 Last2",
        year: 1910
    }
    ];
// Creation of table and adding initial entries
// #############################################
// db.serialize(function () {
//     db.run("create table quotes(id number primary key, quote varchar(255),author varchar(255),year number)");
//     db.run("insert into quotes values(1,'what is there in name','shakespeare',1655)");
//     db.run("insert into quotes values(2,'Love is life','Unknown',0000)");
//     db.run("insert into quotes values(3,'follow your heart','Unknown',1550)");
//     db.run("insert into quotes values(4,'I will take you to mars','Abhishek',2019)");
//     db.run("insert into quotes values(5,'AI is the key for future','Abhishek',2019)");

//     db.each("select * from quotes",function (err,row) {
//         if(err){
//             console.log("error: "+err);
//         }
//         else{
//             console.log(row)
//         }        
//     })
// })
//############################################
db.close();

app = express();
app.use(bodyParser.urlencoded({ extended: true }));
port = 3000;

app.get('/',function (request,response) {
    response.send("Hello!");
});

app.get('/quotes',function (request,response) {
    console.log("list of all quotes");
    if(request.query.year){
        response.send(request.query.year)
    }
    else{
        response.json(quotes);
    }
});
app.get('/quotes/:id',function (request,response) {
    response.send("returning quotes with id: "+request.params.id);
})

app.post('/quotes', function (request,response) {
    console.log("enter the quote"+request.body.quote)
    response.json(request.body);
})

app.listen(port,function () {
    console.log("app is listening at port: "+port);
})

