var express = require('express');
var router = express.Router();
const Grid  = require('gridfs-stream')
const mongoose = require('mongoose')

var catalog = require('../../modules/catalogV2.js')

router.get('/v2/', function(req, res, next) {
  var categories = catalog.findCategories();
  res.json(categories)
});

router.get('/v2/:categoryId', function(req, res, next) {
  var categories = catalog.findItems(req.params.categoryId)
  if(categories === undefined) {
    res.writeHead(404, {'Content-Type' : 'text/plain'})
    res.end('Not Found')
  } else {
    res.json(categories)
  }
})

router.get('/v2/:categoryId/:itemId', function(req, res, next) {
  var item = catalog.findItem(req.params.categoryId, req.params.itemId)
  if (item === undefined) {
    res.writeHead(404, {'Content-Type' : 'text/plain'})
    res.end('Not found')
  } 
  else {
    res.json(item)
  }
})

router.get('/v2/items', function (request, response) {
  var getParams = url.parse(request.url, true).query;
  if(Object.keys(getParams).length == 0) {
    catalogV2.findAllItems(response)
  } else {
    var key = Object.keys(getParams)[0]
    var value = getParams[key]
    catalogV2.findItemsByAttribute(key, value, response)
  }
})

router.get('/v2/item/:itemId/image', function (request, response) {
  var gfs = Grid(model.connection.db, mongoose.mongo)
  catalog.getImage(gfs, request, response)
})

router.get('/item/:itemId/image', function (request, response) {
  var gfs = Grid(model.connection.db, mongoose.mongo)
  catalog.getImage(gfs, request, response)
})

router.post('/v2/item/:itemId/image', function (request, response) {
  var gfs = Grid(model.connection.db, mongoose.mongo)
  catalog.saveImage(gfs, request, response);
})

router.put('/v2/item/:itemId/image', function (request, response) {
  var gfs = Grid(model.connection.db, mongoose.mongo)
  catalog.saveImage(gfs, request.params.itemId, response)
})

router.put('/item/:itemId/image', function (request, response) {
  var gfs = Grid(model.connection.db, mongoose.mongo)
  catalog.saveImage(gfs, request.params.itemId, response)
})

router.delete('/v2/item/:itemId/image', function(request, response) {
  var gfs = Grid(model.connection.db, mongoose.mongo)
  catalog.deleteImage(gfs, model.connection, request.params.itemId, response)
})

router.get('/v2/', function(request, response) {
  var getParams = url.parse(request.url, true).query
  if(getParams['page'] != null) {
    catalog.paginate(model.CatalogItem, request, response)
  } else {
    var key = Object.keys(getParams)[0];
    var value = getParams[key]
    catalog.findItemsByAttribute(key, value, response)
  }
})

module.exports = router;
