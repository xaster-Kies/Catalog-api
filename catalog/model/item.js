const { response } = require('express');
const { request } = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema ({
  "itemId" : { type: String, index: { unique: true }},
  "itemName" : String,
  "price" : Number,
  "currency" : String,
  "categories" : [String]
})

var CatalogItem = mongoose.model('Item', itemSchema)

mongoose.connect('mongodb://localhost/catalog')
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  var watch = new CatalogItem({
    itemName: 9,
    itemName: "Sports Watch1",
    brand: 'A1',
    price: 100,
    currency: "EUR",
    categories: ["Watches", "Sports Watches"]
  })
})

watch.save((error, item, affectNo) => {
  if (!error) {
    console.log('Item added successfully to the catalog');
  } else {
    console.log('Cannot add item to the catalog')
  }
})

db.once('open', function() {
  var filter = {
    'itemName' : 'Sports Watch',
    'price': 100
  }

  CatalogItem.find(filter, (error, result) => {
    if(error) {
      console.log('Error Occured')
    } else {
      console.log('Results found:' + result.length)
      console.log(result)
    }
  })
})

Catalog.Item.findOne({itemId: 1}, (error, data) => {
  if (error) {
    console.log(error)
    return
  } else {
    if (!data) {
      console.log('not found')
      return
    } else {
      data.remove(function(error) {
        if (!error) {
          data.remove()
          
        } else {
          console.log(error)
        }
      })
    }
  }
})

exports.remove = function (request, response) {
  console.log('Delete item with id: ' + request.body.itemId)
  CatalogItem.findOne({ itemId: request.params.itemId}, function(error, data) {
    if(error) {
      console.log(error)
      if( response != null) {
        response.writeHead(500, contentTypePlainText)
        response.end('Internal Server error')
      }
      return;
    } else {
      if (!data) {
        console.log('Item not found')
        if (response != null) {
          response.writeHead(404, contentTypePlainText)
          response.end('Not Found')
        }
        return
      } else {
        data.remove(function(error) {
          if (!error) {
            data.remove()
            response.json({'Status': 'Successfully deleted'})
          }
          else {
            console.log(error)
            response.writeHead(500, contentTypePlainText);
            response.end('Internal Server Error')
          }
        })
      }
    }
  })
}

function toItem(body) {
  return new CatalogItem({
    itemId: body.itemId,
    itemName: body.itemName,
    price: body.price,
    currency: body.currency,
    categories: body.categories
  })
}

exports.saveItem = function(request, response ){
  var item = toItem(request.body)
  item.save((error) => {
    if(!error) {
      item.save();
      response.writeHead(201, contentTypeJson)
      response.end(JSON.stringify(request.body))
    } else {
      console.log(error);
      CatalogItem.findOne({ itemId: item.itemId },
        (error, result) => {
          console.log('Check if such an item exists');
          if(error) {
            console.log(error)
            response.writeHead(500, contentTypePlainText);
            response.end('Internal Server Error')
          } else {
            console.log('Updating existing item')
            result.itemId = item.itemId;
            result.itemName = item.itemName;
            result.price = item.price
            result.currency = item.currency
            result.categories = item.categories
            result.save();
            response.json(JSON.stringify(result))
          }
        })
    }
  })
}

exports.findItemsByCategory = function (category, response) {
  CatalogItem.find({categories: category}, function(error, result) {
    if(error) {
      console.error(error)
      response.writeHead(500, { 'Content-Type': 'text/plain' })
      return
    } else {
      if(!result) {
        if(response != null) {
          response.writeHead(404, contentTypePlainText);
          response.end('Not Found')
        }
        return
      }

      if (response != null) {
        response.setHeader('Content-Type', 'application/json')
        response.send(result)
      }
      console.log(result);
    }
  })
}

exports.findItemById = function (itemId, response) {
  CatalogItem.findOne({itemId: itemId}, function(error, result) {
    if(error) {
      console.error(error)
      response.writeHead(500, contentTypePlainText)
      return;
    } else {
      if (!result) {
        if(response != null ) {
          response.writeHead(404, contentTypePlainText)
          response.end('Not Found')
        }
        return
      }

      if (response != null ) {
        response.setHeader('Content-Type', 'application/json')
        response.send(result)
      }
      console.log(result)
    }
  })
}

exports.findAllItems = function (response) {
  CatalogItem.find({}, (error, result) => {
    if( error ) {
      console.error(error)
      return null;
    }
    if (result != null ) {
      response.json(result)
    } else {
      response.json({})
    }
  })
}