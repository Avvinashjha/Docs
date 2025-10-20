"use strict";
console.log("hello");
// String number and boolean
let age = 10;
let username = "avinash";
let isActive = true;
// null and undefined
let nothing = null;
let notDefined = undefined;
// Array
let numbers = [1, 2, 3];
let names = ["Name1", "name2"];
// tuple
let user = ["name1", 10];
// enums
var Role;
(function (Role) {
    Role[Role["Admin"] = 0] = "Admin";
    Role[Role["User"] = 1] = "User";
    Role[Role["Guest"] = 2] = "Guest"; // 2
})(Role || (Role = {}));
let myRole = Role.Admin;
var FileType;
(function (FileType) {
    FileType["PDF"] = "pdf";
    FileType["DOC"] = "doc";
    FileType["TXT"] = "txt";
})(FileType || (FileType = {}));
let file = FileType.PDF;
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus[PaymentStatus["Pending"] = 0] = "Pending";
    PaymentStatus[PaymentStatus["Completed"] = 1] = "Completed";
    PaymentStatus[PaymentStatus["Failed"] = 2] = "Failed";
})(PaymentStatus || (PaymentStatus = {}));
let pstatus = PaymentStatus.Completed;
let product = ["Apple", 10, true];
// Function
//1. prameter and return type
function add(a, b) {
    return a + b;
}
// optional parameter
function greet(name) {
    return name ? `Hello ${name}` : "Hello, User";
}
// Default parameter
function multiply(a, b = 2) {
    return a * b;
}
console.log(multiply(2));
