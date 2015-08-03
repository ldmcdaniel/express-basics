var express = require('express');
var router = express.Router({
  caseSensitive: true
});

router.get('/:topping/:qty', function (req, res) {
  var obj = req.params;

  res.render('templates/pizza', obj);
});

module.exports = router;
