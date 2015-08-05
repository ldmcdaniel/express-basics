var fs = require('fs');

var express = require('express');
var lessCSS = require('less-middleware');
var morgan = require('morgan');
var loggly = require('loggly');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var pizza = require('./routes/pizza');
var chickenNuggets = require('./routes/chickennuggets');

var app = express();

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.locals.title = "aweso.me";

app.use(lessCSS('public'));

// app.use(function (req, res, next) {
//   //logging at the top
//   console.log('Request at ' + new Date().toISOString());
//   next();
// });

var logStream = fs.createWriteStream('access.log', {flags: 'a'});
app.use(morgan('combined', {stream: logStream}));
app.use(morgan('dev'));

var client = loggly.createClient({
  token: '59511982-7b6a-4995-9119-eb07bcfe17c9',
  subdomain: 'ldmcdaniel',
  tags: ['NodeJS'],
  json: true
});

client.log("Hello World!");

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);
app.use('/pizza', pizza);
app.use('/chickennuggets', chickenNuggets);
app.set('strict routing', true);

app.use(function (req, res) {
  res.status(403).send('Unauthorized!');
});

app.use(function (err,req, res, next) {
  //pass 4 arguments to create an error handling middleware
  console.log('ERRRRRRRR', err.stack);
  res.status(500).send('My Bad');
});

var server = app.listen(3000, function () {
var host = server.address().address;
var port = server.address().port;

console.log('Example app listening at http://%s:%s', host, port);
});

