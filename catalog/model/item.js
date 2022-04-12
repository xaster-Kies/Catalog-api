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