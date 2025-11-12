// 1. Factorial Problem

/**
 * What is a factorial?
 * Factorial is a mathematical operation where n! = n * n-1 * n-2 *...*2*1
 * 5! = 5 * 4 * 3 * 2 * 1 = 120
 * 
 * How to solve this?
 * 
 * 1. Iterative way
 *    let res = 1;
 *    loop i = 1 to n
 *      res *= i;
 *    return res;
 * 
 * 2. Recursive way
 *    base case: if n = 1 then 1
 *    base case: if n = 0 then 1
 *    else n * fact(n-1)
 * 
 */

// 1. Iterative 

function factIterative(n){
    if(n ===0 || n ===1) return 1;
    let res = 1;
    for(let i =1; i<= n; i++){
        res*= i;
    }
    return res;
}

// console.log(factIterative(5));

// 2. Recursive

function factRecursive(n){
    if(n === 0 || n === 1) return 1;
    return n * factRecursive(n-1);
}

// console.log(factRecursive(5));

/**Reverse a string using recursion */

function reverseString(str){
    if(str.length <= 1) return str;
    const lastCharacter = str[str.length -1];
    const remainingString = str.slice(0, -1);
    return lastCharacter + reverseString(remainingString);
}

// console.log(reverseString("Avinash"));

/**Fibonacci Number
 * A mathematical operation where fib(n) = fib(n-1) + fib(n-2)
 * fib(5) = fib(4) + fib(3)
 * = (fib(3) + fib(2)) + (fib(2) + fib(1))
 * = (fib(2) + fib(1)) + fib(1) + fib(0) ...
 */

function fib(n){
    if( n == 1) return 1;
    if(n == 0) return 0;

    return fib(n-1) + fib(n-2);
}

// console.log(fib(5));


/** 
 * Sum of digits
 */

function sumOfDigits(num){
    if(num === 0) return 0;
    return num%10 + sumOfDigits(Math.floor(num/10));
}

// console.log(sumOfDigits(12345));

/**
 * Check a palindrome
 */

function isPalindrome(s, left = 0, right = s.length -1){
   if(left >= right) return true;
   if(s[left] !== s[right])return false;
   return isPalindrome(s, left+1, right-1);
}

// console.log(isPalindrome("NAN"));

/**
 * Tower of Hanoi
 * 
 */

/**
 * Binary search
 */

function binarySearch(arr = [], val, left = 0, right= arr.length){
    if(left > right) return -1;

    let mid = Math.floor((right + left)/2);
    if(arr[mid] === val){
        return mid;
    }
    else if(arr[mid]<val){
        return binarySearch(arr, val, mid+1, right);
    }else{
        return binarySearch(arr,val, left, mid-1);
    }
}

let index = binarySearch([1,2,3,4,5,6], 5, 0, 6);
console.log(index);

function binarySearchRecursive(arr, val){
    let left = 0;
    let right = arr.length -1;

    while(left <= right){
        let mid = Math.floor
    }
}