var express = require('express');
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
var router = express.Router();

passport.use(new BasicStrategy(function(username, password, done) {
  if(username == 'user' && password=='default') {
    return done(null, username)
  }
}))

var catalog = require('../modules/catalogV1.js')

router.get('/v1/', function(req, res, next) {
  passport.authenticate(basic, { session: false })
  var categories = catalog.findCategories();
  res.json(categories)
});

router.get('/:categoryId', function(req, res, next) {
  var categories = catalog.findItems(req.params.categoryId)
  if(categories === undefined) {
    res.writeHead(404, {'Content-Type' : 'text/plain'})
    res.end('Not Found')
  } else {
    res.json(categories)
  }
})

router.get('/:categoryId/:itemId', function(req, res, next) {
  var item = catalog.findItem(req.params.categoryId, req.params.itemId)
  if (item === undefined) {
    res.writeHead(404, {'Content-Type' : 'text/plain'})
    res.end('Not found')
  } 
  else {
    res.json(item)
  }
})

module.exports = router;
