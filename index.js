var express = require('express');
var bodyParser = require('body-parser');
var sqlite = require('sqlite3');

var db = new sqlite.Database('database.db');
// Creation of table and adding initial entries
// uncomment it when running first time
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
//db.close();
//############################################


app = express();
app.use(bodyParser.urlencoded({ extended: true }));
port = 3000;


app.get('/',function (request,response) {
    response.send("Hello and Welcome to world of Quotes!");
});

app.get('/quotes', function(req, res){
    if(req.query.year){
        db.all('SELECT * FROM quotes WHERE year = ?', [req.query.year], function(err, rows){
            if(err){
                res.send(err.message);
            }
            else{
                console.log("Return a list of quotes from the year: " + req.query.year);
                res.json(rows);
            }
        });
    }
    else{
        db.all('SELECT * FROM quotes', function processRows(err, rows){
            if(err){
                res.send(err.message);
            }
            else{
                for( var i = 0; i < rows.length; i++){
                    console.log(rows[i].quote);
                }
                res.json(rows);
            }
        });
    }

    // When using json data
    // if(request.query.year){
    //     response.send(request.query.year)
    // }
    // else{
    //     response.json(quotes);
    // }
});
app.get('/quotes/:id',function (request,response) {
    db.serialize(function () {
        db.all("select * from quotes where id=?",request.params.id,function (err,row) {
            if (err) {
                response.send("No quotes available");
            } else {
                response.json(row)               
            } 
        });
    })
})

app.post('/quotes', function (request,response) {
    console.log("enter the quote"+request.body.quote)
    db.run("Insert into quotes values(?,?,?,?)",[request.body.id,request.body.quote,request.body.author,request.body.year],function (err) {
        if(err){
            console.log("error occured!");
            response.send("error occured!"+err);
        }
        else{
            console.log("Success!");
            response.send("Success!");
        }
    })
})

app.listen(port,function () {
    console.log("app is listening at port: "+port);
})

