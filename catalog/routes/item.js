const express = require('express')
const router = express.Router();

const catalog = require('../modules/catalog')
const model = require('../model/item')

router.get('/', function(request, response, next) {
  catalog.findAllItems(response)
})

router.get('/item/:itemId', function(request, response, next) {
  console.log(request.url + ' : querying for ' + request.params.itemId)
  catalog.findItemById(request.params.itemId, response)
})

router.get('/:categoryId', function(request, response, next) {
  catalog.findItemsBy
})