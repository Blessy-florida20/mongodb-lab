// Q2. Employee Database  (database: EmployeeDB, collection: employees)
// Run:  mongosh --file 02_employee_database.js
db = db.getSiblingDB("EmployeeDB");  // same as: use EmployeeDB

// @section Setup: create database, collection and insert 5 employees
db.employees.drop();
db.createCollection("employees");
db.employees.insertMany([
  { empId: 1, name: "Anita",  department: "HR",      salary: 35000, experience: 3 },
  { empId: 2, name: "Bala",   department: "IT",      salary: 52000, experience: 5 },
  { empId: 3, name: "Charan", department: "IT",      salary: 45000, experience: 4 },
  { empId: 4, name: "Deepa",  department: "Finance", salary: 40000, experience: 6 },
  { empId: 5, name: "Eswar",  department: "IT",      salary: 60000, experience: 8 }
]);

// @section a. Display all employees
printjson(db.employees.find().toArray());

// @section b. Employees earning more than Rs. 40,000
printjson(db.employees.find({ salary: { $gt: 40000 } }).toArray());

// @section c. Update the salary of an employee
db.employees.updateOne({ empId: 1 }, { $set: { salary: 38000 } });
printjson(db.employees.findOne({ empId: 1 }));      // verify

// @section d. Employees in descending order of salary
printjson(db.employees.find().sort({ salary: -1 }).toArray());

// @section e. Count employees in a particular department (IT)
print(db.employees.countDocuments({ department: "IT" }));
