// Q4. Library Database  (database: LibraryDB, collection: books)
// Run:  mongosh --file 04_library_database.js
db = db.getSiblingDB("LibraryDB");   // same as: use LibraryDB

// @section Setup: create database, collection and insert books
db.books.drop();
db.createCollection("books");
db.books.insertMany([
  { bookId: 1, title: "Wings of Fire",          author: "A.P.J. Abdul Kalam", category: "Biography", price: 250 },
  { bookId: 2, title: "Clean Code",             author: "Robert C. Martin",   category: "Technology", price: 550 },
  { bookId: 3, title: "The Pragmatic Programmer", author: "Andrew Hunt",      category: "Technology", price: 600 },
  { bookId: 4, title: "Ignited Minds",          author: "A.P.J. Abdul Kalam", category: "Self-Help",  price: 220 },
  { bookId: 5, title: "Godan",                  author: "Premchand",          category: "Fiction",    price: 180 }
]);

// @section a. All books written by a specified author
printjson(db.books.find({ author: "A.P.J. Abdul Kalam" }).toArray());

// @section b. Books belonging to a particular category
printjson(db.books.find({ category: "Technology" }).toArray());

// @section c. Update the price of a book
db.books.updateOne({ bookId: 5 }, { $set: { price: 200 } });
printjson(db.books.findOne({ bookId: 5 }));         // verify

// @section d. Sort books alphabetically by title
printjson(db.books.find().sort({ title: 1 }).toArray());

// @section e. Count the number of books in the collection
print(db.books.countDocuments());
