const { response } = require('express');
var express = require('express');
var catalog = require('../modules/catalog.js')

var router = express.Router();


router.get('/', function(req, res, next) {
  var categories = catalog.findCategories();
  response.json(categories)
});

router.get('/:categoryId', function(req, res, next) {
  var categories = catalog.findItems(req.params.categoryId)
  if(categories === undefined) {
    response.writeHead(404, {'Content-Type' : 'text/plain'})
    response.end('Not Found')
  } else {
    response.json(categories)
  }
})

router.get('/:categoryId/:itemId', function(req, res, next) {
  var item = catalog.findItem(req.params.categoryId, req.params.itemId)
  if (item === undefined) {
    response.writeHead(404, {'Content-Type' : 'text/plain'})
    response.end('Not found')
  } 
  else {
    response.json(item)
  }
})

module.exports = router;
