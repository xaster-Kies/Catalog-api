const express = require('express')
const router = express.Router();

const catalog = require('../modules/catalogV1')
const model = require('../model/item')

router.get('/v1/', function(request, response, next) {
  catalog.findAllItems(response)
})

router.get('/v1/item/:itemId', function(request, response, next) {
  console.log(request.url + ' : querying for ' + request.params.itemId)
  catalog.findItemById(request.params.itemId, response)
})

router.get('/v1/:categoryId', function(request, response, next) {
  catalog.findItemById(request.params.itemId, response)
})

router.post('/v1/', function(request, response, next) {
  console.log('Saving item using POST method')
  catalog.saveItem(request, response)
})

router.put('/v1/', function(request, response, next) {
  console.log('Saving item using PUT method')
  catalog.saveItem(request, response)
})

router.delete('/v1/item/:itemId', function(request, response, next) {
  console.log('Delete item with id: request.params.itemId')
  catalog.remove(request, response)
})

module.exports = router;