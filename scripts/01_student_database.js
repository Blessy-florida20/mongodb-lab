// Q1. Student Database Management  (database: CollegeDB, collection: students)
// Run:  mongosh --file 01_student_database.js
db = db.getSiblingDB("CollegeDB");   // same as: use CollegeDB

// @section Setup: create database, collection and insert 5 students
db.students.drop();                       // start clean so the script can be re-run
db.createCollection("students");
db.students.insertMany([
  { rollNo: 101, name: "Arun",  department: "CSE", age: 20, mark: 85 },
  { rollNo: 102, name: "Priya", department: "IT",  age: 21, mark: 92 },
  { rollNo: 103, name: "Kumar", department: "CSE", age: 19, mark: 78 },
  { rollNo: 104, name: "Divya", department: "ECE", age: 20, mark: 88 },
  { rollNo: 105, name: "Ravi",  department: "CSE", age: 22, mark: 67 }
]);

// @section a. Display all student records
printjson(db.students.find().toArray());

// @section b. Retrieve a student using the roll number
printjson(db.students.findOne({ rollNo: 102 }));

// @section c. Students who scored more than 80 marks
printjson(db.students.find({ mark: { $gt: 80 } }).toArray());

// @section d. Update the marks of a particular student
db.students.updateOne({ rollNo: 101 }, { $set: { mark: 90 } });
printjson(db.students.findOne({ rollNo: 101 }));    // verify

// @section e. Delete a student record using the roll number
db.students.deleteOne({ rollNo: 105 });
printjson(db.students.find().toArray());            // verify
