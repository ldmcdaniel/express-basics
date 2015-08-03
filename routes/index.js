var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.write('Hello World!');
});

router.get('/hello/', function (req, res) {
  res.send('Hello World!');
});

router.get('/hello', function (req, res) {
  res.send('Hello!');
});

router.get('/thisshoulderror', function (req, res) {
  res.send(badVariable);
});

router.get('/json', function (req, res) {
  res.send({an: 'object'});
});

router.get('/test', function (req, res, next) {
  res.write('Hello ');
  next();
});

router.get('/awesomethings', function (req, res) {
  setTimeout(function() {
    var awesomeThings = [
      'Pizza',
      'Bacon',
      '2nd Amendment',
      'Pluto',
      'Space Jam'
    ];

    res.render('templates/world',
      { welcome: 'Thanks for coming!',
        awesomeThings: awesomeThings
      }
    );
  }, 5000);
});

router.get('/test', function (req, res) {
  res.end('Worlds!');
});


router.get('/', function (req, res) {
  res.send('This is the root!');
});

module.exports = router;
