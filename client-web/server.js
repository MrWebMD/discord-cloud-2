var express = require("express");
var app = express()
var port = 31027;
var path = require('path');
var indexRouter = require("./routes/index");

const rootFolder = path.join(__dirname, '/public')

var logger = (req, res, next) => {
	let currentDate = new Date();
	let logMessage = `[${currentDate}] ${req.ip} ${req.method}:${req.url} ${res.statusCode}`;
	console.log(logMessage);
	next();
}

app.use(logger)
// app.use(express.static(path.join(__dirname,'../client-dev/build')))

app.use(express.static('public'))

app.use("/", indexRouter);



app.locals.rootFolder = rootFolder


// app.get('*', (req,res) =>{
  // res.sendFile(path.join(__dirname, '/public/index.html'));
// });

console.log("My server is running on localhost:" + port);

var server = app.listen(port)