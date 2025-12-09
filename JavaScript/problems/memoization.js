/**
 * What is memoization?
 * Memoization means you function should not perform 
 * calculation for a parameter on which you function already called
 * 
 * so memoization utilizes the concept of closure 
 * where you create a map which will be in outer scope and 
 * return a memoized function inside which you will use that map to 
 * cache the result and return the result of it's present in map
 */

function memoization(callback){
    const memo = new Map();
    return function(...args){
        const key = JSON.stringify(args);
        if(memo.has(key)){
            return memo.get(key);
        }
        const result = callback(...args);
        memo.set(key, result);
        return result;
    }
}


function sum(...prams){
    return prams.reduce((a,b)=> a+ b, 0);
}

const memoizedSum = memoization(sum);

console.log(memoizedSum(3,4,5));

console.log(memoizedSum(3,4,5));
