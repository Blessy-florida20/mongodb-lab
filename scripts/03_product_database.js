// Q3. Product Database  (database: ProductDB, collection: products)
// Run:  mongosh --file 03_product_database.js
db = db.getSiblingDB("ProductDB");   // same as: use ProductDB

// @section Setup: create database, collection and insert products
db.products.drop();
db.createCollection("products");
db.products.insertMany([
  { productId: 1, name: "Keyboard",   category: "Electronics", price: 1200,  stock: 25 },
  { productId: 2, name: "Mouse",      category: "Electronics", price: 600,   stock: 40 },
  { productId: 3, name: "Notebook",   category: "Stationery",  price: 80,    stock: 0  },
  { productId: 4, name: "Headphones", category: "Electronics", price: 2500,  stock: 15 },
  { productId: 5, name: "Backpack",   category: "Accessories", price: 1800,  stock: 10 },
  { productId: 6, name: "Pen Pack",   category: "Stationery",  price: 120,   stock: 0  },
  { productId: 7, name: "Monitor",    category: "Electronics", price: 9500,  stock: 5  }
]);

// @section a. Products belonging to a specific category
printjson(db.products.find({ category: "Electronics" }).toArray());

// @section b. Products priced between Rs. 500 and Rs. 2,000
printjson(db.products.find({ price: { $gte: 500, $lte: 2000 } }).toArray());

// @section c. Increase the stock quantity of a product (+20)
db.products.updateOne({ productId: 2 }, { $inc: { stock: 20 } });
printjson(db.products.findOne({ productId: 2 }));   // verify

// @section d. Delete products whose stock quantity is zero
db.products.deleteMany({ stock: 0 });
printjson(db.products.find().toArray());            // verify

// @section e. Display the five most expensive products
printjson(db.products.find().sort({ price: -1 }).limit(5).toArray());
