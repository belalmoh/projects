"use strict";

var app = require('express')();
var mysql = require('mysql');
var email = require('./email');
var dbEngine = require('./dbconn');

app.listen("3000", function () {
    console.log("Server is listening on port 3k");
});

email.setCredentials("belal4131148@gmail.com", "Asdasd7*");

var employee = {
    Fname: "Test233",
    Minit: "T",
    Lname: "Woot",
    Ssn: 78991,
    Bdate: "1994-05-15",
    Address: "Cairo, Egypt",
    Sex: 'M',
    Salary: 201000,
    Super_ssn: 11,
    Dno: 3,
    Email: "test@testie.com"
}

var insertionQuery = `INSERT INTO employee 
                        VALUES ('${employee.Fname}', '${employee.Minit}', '${employee.Lname}',
                                '${employee.Ssn}', '${employee.Bdate}', '${employee.Address}',
                                '${employee.Sex}', '${employee.Salary}', '${employee.Super_ssn}',
                                '${employee.Dno}', '${employee.Email}')`;

var checkingSalaryQuery = `SELECT @isEmployeeGreater AS result`;

var dbConnectionInstance = dbEngine.initConnection(mysql);

dbEngine.query(dbConnectionInstance, insertionQuery, function(successResponse) {
    
}, function(errorResponse) {
    
});

dbEngine.query(dbConnectionInstance, checkingSalaryQuery, function(successResponse) {
    if(successResponse[0].result !== null){
        email.sendEmail(["belal.mohamed@acu.edu.eg", "osman.ibrahim53@yahoo.com"], "Employee Salary Warning.", successResponse[0].result);
    }
}, function(errorResponse) {
    console.log(errorResponse);
});

setTimeout(function(){ process.exit(); }, 10000);