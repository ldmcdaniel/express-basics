var express = require('express');
var moment = require('moment');

var Order = require('../models/ChickenNuggets');

var router = express.Router();

router.get('/', function (req, res) {
  ChickenNuggets.findAll(function (err, orders) {
    res.render('templates/chicken-index', {orders: formatAllOrders(order)});
  });

  function formatAllOrders(order) {
    return orders.map(function(order) {
      order.flavor = order.style;
      order.createdAt = moment(order._id.getTimestamp()).fromNow();
      delete order.style;
      return order;
    });
  };

    // var collection = global.db.collection('chickenNuggets');

  // collection.find().toArray(function (err, orders) {
    // var formattedOrders = orders.map(function(order) {
    //   return {
    //     _id:        order._id,
    //     name:       order.name,
    //     flavor:     order.style,
    //     qty:        order.qty,
    //     complete:   order.complete,
    //     createdAt:  moment(order._id.getTimestamp()).fromNow()
    //   }
    // });

    // res.render('templates/chicken-index', {orders: formattedOrders});
  // });
});

router.get('/order', function (req, res) {
  res.render('templates/chicken-new');
});

router.post('/order', function (req, res) {
  var order = new Order(req.body);

  order.save(function () {
    res.redirect('/chickennuggets');
  })

  // Order.save(req.body, function () {
  //   res.redirect('/chickennuggets');
  // });

  // var collection = global.db.collection('chickenNuggets');

  // collection.save(req.body, function () {
  //   res.redirect('/chickennuggets');
  // });
});

router.post('/order/:id/complete', function (req, res) {
  Order.findById(req.params.id, function (err, order) {
    order.complete(function () {
    res.redirect('/chickennuggets')
    });
  });

  // var collection = global.db.collection('chickenNuggets');

  // collection.update(
  //   {_id: ObjectID(req.params.id)},
  //   {$set: {complete: true}},
  //   function () {
  //     res.redirect('/chickennuggets');
  //   });
});

module.exports = router;
