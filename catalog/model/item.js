var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const { request, response } = require('../app');
var Schema = mongoose.Schema;

var itemSchema = new Schema ({
  "itemId" : { type: String, index: { unique: true }},
  "itemName" : String,
  "price" : Number,
  "currency" : String,
  "categories" : [String]
})
console.log('paginate')
itemSchema.plugin(mongoosePaginate)
var CatalogItem = mongoose.model('Item', itemSchema)

module.exports = {CatalogItem : CatalogItem, connection : mongoose.connection}

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

CatalogItem.paginate({}, {page: request.query.page, limit: request.query.limit}, 
  function (error, result) {
    if(error) {
      console.log(error);
      response.writeHead('500', {'Content-Type' : 'text/plain'})
      response.end('Internal Server Error')
    } else {
      response.json(result)
    }
  })

