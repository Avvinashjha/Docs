const arr = [1,2,3];
console.log(arr);

// add a hole
delete arr[1];
console.log(arr);
console.log(arr.length);

// mix the array
arr[3] = 4.5;
arr[4] = "foo";
arr[5] = {name: "Avinash"};
console.log(arr);
console.log(arr.length);

// access the array element 
console.log(arr["1"]);
console.log(arr[1])

// try to set sting index
arr["foo"] = "bar";
console.log(arr);
console.log(arr["foo"])
console.log(arr.foo);





let a = [1,2,3];
let b = a;

b[0] =99;
a[1] = 56;
console.log(a, b);
