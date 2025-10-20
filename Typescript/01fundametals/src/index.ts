console.log("hello")

// String number and boolean
let age : number = 10;
let username: string = "avinash";
let isActive: boolean = true;

// null and undefined

let nothing: null = null;
let notDefined: undefined = undefined;

// Array
let numbers: number[] = [1,2,3];
let names: Array<string> = ["Name1", "name2"];


// tuple
let user : [string, number] = ["name1", 10];

// enums
enum Role {
    Admin, // 0
    User,  // 1
    Guest  // 2
}
let myRole: Role = Role.Admin;

enum FileType {
    PDF = "pdf",
    DOC = "doc",
    TXT = "txt"
}

let file: FileType = FileType.PDF;

enum PaymentStatus {
    Pending,
    Completed,
    Failed
}

let pstatus: PaymentStatus = PaymentStatus.Completed;

let product : [string, number, boolean] = ["Apple", 10, true];

// Function

//1. prameter and return type
function add(a: number, b: number): number{
    return a + b;
}

// optional parameter
function greet(name?: string): string{
    return name ? `Hello ${name}` : "Hello, User";
}

// Default parameter
function multiply(a: number, b: number = 2): number{
    return a * b;
}
console.log(multiply(2));

// function type annotation
let logMessage: (msg: string) => void;
logMessage = (msg) => console.log(msg);


function calculateArea(width: number, height: number, unit: string):string{
    let area: number = width * height;
    return area + unit + "^2";
}

console.log(calculateArea(2,3, "cm"));

//interface
interface User {
    id: number;
    name: string;
    email?: string; // optional
    readonly createdAt: Date; // can not change
}

let user1: User = {
    id: 1,
    name: "Avi",
    createdAt: new Date()
}

// type alias
type Product = {
    id: number;
    title: string;
    price: number;
}

let product1: Product = {id: 1, title: "Macbook", price: 1399};

// Union Types
let id: number | string;
id = 101;
id = "avinash"

let stat : "success" | "error" | "loading" = "error";

// Intersection Types
interface Person {
    name: string;
}

interface Emplayee {
    employeeId: number;
}

type Staff = Person & Emplayee;

const staff: Staff = {
    name: "Avinash",
    employeeId: 123
}

type Admin = {
    role: "admin"
}

type User1 = {
    username: string
}

type AdminUser = User1 & Admin;

let adminUser:AdminUser = {
    username: "Avinash",
    role: "admin"
}

// Literal Types
let direction: "up" | "down" | "left" | "right";
direction = "down";

const colors = ["red", "green", "blue"] as const;
type color = typeof colors[number];

let red:color = "blue";

// Type Narrowing (Control flow analysis)
function printValue(value: string | number){
    if(typeof value === 'string'){
        // we will get methods that are only applied to string
        // narrow to string
        console.log(value.toUpperCase()); 
    }else{
        // We eill get methods will get number
        // narrowed for number
        console.log(value.toFixed(2));
    }
}

// Type Guards
// Type guards are function or check that narrow a type

// typeof
function double(input: number | string){
    if(typeof input === 'string'){
        return input.repeat(2);
    }
    return input * 2;
}

// instanceof
class Dog { bark(){}}
class Cat { meow(){}}

function speak(animal: Dog | Cat){
    if(animal instanceof Dog) {
        animal.bark();
    }else{
        animal.meow();
    }
}

// custom type guard
type Fish = { swim: () => void};
type Bird = { fly: () => void};

function isFish(pet: Fish | Bird): pet is Fish{
    return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird){
    if(isFish(pet)){
        pet.swim();// Narrowed to fish
    } else {
        pet.fly(); // narrow to bird
    }
}

// Function Overloading
// function combine(a: string, b: string): string;
// function combine(a: number, b: number): number;

function combine(a: string | number, b: string | number): string | number {
    if(typeof a === 'string' && typeof b === "string"){
        return a + b;
    }
    if(typeof a === "number" && typeof b === "number"){
        return a + b;
    }
    throw new Error("Invalid arguments");
}


