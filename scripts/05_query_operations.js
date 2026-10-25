// Q5. Query Operations on the students collection (CollegeDB)
// Run:  mongosh --file 05_query_operations.js
db = db.getSiblingDB("CollegeDB");   // same as: use CollegeDB

// @section Setup: reset the students collection
db.students.drop();
db.students.insertMany([
  { rollNo: 101, name: "Arun",  department: "CSE", age: 20, mark: 85 },
  { rollNo: 102, name: "Priya", department: "IT",  age: 21, mark: 92 },
  { rollNo: 103, name: "Kumar", department: "CSE", age: 19, mark: 78 },
  { rollNo: 104, name: "Divya", department: "ECE", age: 20, mark: 88 },
  { rollNo: 105, name: "Ravi",  department: "CSE", age: 22, mark: 67 }
]);

// @section a. Marks greater than or equal to 75
printjson(db.students.find({ mark: { $gte: 75 } }).toArray());

// @section b. Age less than 21
printjson(db.students.find({ age: { $lt: 21 } }).toArray());

// @section c. Students belonging to either CSE or IT
printjson(db.students.find({ department: { $in: ["CSE", "IT"] } }).toArray());

// @section d. Top three students based on marks
printjson(db.students.find().sort({ mark: -1 }).limit(3).toArray());

// @section e. Update multiple records using updateMany() (+5 marks for CSE)
db.students.updateMany({ department: "CSE" }, { $inc: { mark: 5 } });
printjson(db.students.find({ department: "CSE" }).toArray());   // verify
