var fs = require('fs')
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

function readCatalogSync() {
  var file = '../data/catalog.json'
  if(fs.existsSync(file)) {
    var content = fs.readFileSync(file);
    var catalog = JSON.parse(content)
    return catalog;
  }
  return undefined
}

exports.findItems = function(categoryId) {
  console.log('Returning all items for categoryId: ' + categoryId)
  var catalog = readCatalogSync()
  if (catalog) {
    var items = [];
    for (var index in catalog.catalog) {
     if (catalog.catalog[index].categoryId === categoryId) {
        var category = catalog.catalog[index];
        for (var itemIndex in category.items) {
          items.push(category.items[itemIndex])
        }
     }
    }
    return items;
  }
  return undefined;
}

exports.findItem = function(categoryId, itemId) {
  console.log('Looking for item with id' + itemId);
  var catalog = readCatalogSync();
  if(catalog) {
    for (var index in catalog.catalog) {
      if(catalog.catalog[index].categoryId === categoryId) {
        var category = catalog.catalog[index] 
        for( var itemIndex in category.items ) {
          if (category.items[itemIndex].itemId === itemId) {
            return category.items[itemIndex];
          }
        } 
      }
    }
  }
  return undefined
}

exports.findCategories = function() {
  console.log('Returning all categories') 
  var catalog = readCatalogSync()
  if(catalog) {
    var categories = [];
    for (var index in catalog.catalog ) {
      var category = {}
      category["categoryId"] = catalog.catalog[index].categoryId;
      category["categoryName"] = catalog.catalog[index].categoryName;

      categories.push(category)
    }
    return categories
  }
  return []
}