/**
 * Implement a deep clone
 * 
 * What is deep clone?
 * 
 * Deep clone is a way to clone an object where it should not reference 
 * to original object at any level.
 * 
 * Generally we use JSON.parse(JSON.stringify(obj)) to deep clone but
 * it does not clone properly if your object has methods, regex etc then 
 * it will not clone those
 */

/**
 * Basic DeepClone
 * @param {*} obj : Object to clone
 * @param {*} seen : track of internal objects
 * 
 * Map, Set, Date, RegExp are not cloned properly in this case
 * 
 * original object =  {
 *   num: 1,
 *   date: 2025-12-10T14:14:58.965Z,
 *   nested: { a: 2 },
 *   arr: [ 1, { b: 3 } ],
 *   map: Map(1) { 'x' => { y: 10 } },
 *   set: Set(2) { 1, { z: 20 } }
 * } 
 *  cloned obj =  {
 *   num: 1,
 *   date: {},
 *   nested: { a: 2 },
 *   arr: [ 1, { b: 3 } ],
 *   map: {},
 *   set: {}
 * }
 * Here we lost Map set and date
 */
const obj = {
  num: 1,
  date: new Date(),
  nested: { a: 2 },
  arr: [1, { b: 3 }],
  map: new Map([["x", { y: 10 }]]),
  set: new Set([1, { z: 20 }])
};

function deepCloneBasic(obj, seen = new WeakMap()){
    // primitive handled
    if(obj === null || typeof obj !== "object") return obj;
    // cycle handled
    if(seen.has(obj)) return seen.get(obj);

    const copy = Array.isArray(obj)? []: {};
    seen.set(obj, copy);
    for(const key in obj){
        copy[key] = deepCloneBasic(obj[key], seen);
    }
    return copy;
}


console.log("original object = ",obj)
console.log ("cloned obj basic = ", deepCloneBasic(obj));

/**
 * Deep clone with Map, date, Set cloning ability
 * original Obj =  {
 *   num: 1,
 *   date: 2025-12-10T14:30:03.137Z,
 *   nested: { a: 2 },
 *   arr: [ 1, { b: 3 } ],
 *   map: Map(1) { 'x' => { y: 10 } },
 *   set: Set(2) { 1, { z: 20 } }
 * }
 * cloned obj =  {
 *   num: 1,
 *   date: 2025-12-10T14:30:03.137Z,
 *   nested: { a: 2 },
 *   arr: [ 1, { b: 3 } ],
 *   map: Map(1) { 'x' => { y: 10 } },
 *   set: Set(2) { 1, { z: 20 } }
 * }
 */

function deepClone(obj, seen = new WeakMap()){
    // Handle primitive
    if(obj === null || typeof obj !== "object"){
        return obj;
    }

    // Handle cycles
    if(seen.has(obj)) return seen.get(obj);

    // Handle date
    if(obj instanceof Date) return new Date(obj);

    // Handle RegExp
    if(obj instanceof RegExp) return new RegExp(obj.source, obj.flags);

    // Handle Map
    if(obj instanceof Map){
        const result = new Map();
        seen.set(obj, result);
        obj.forEach((value,key)=>{
            result.set(deepClone(key, seen), deepClone(value, seen));
        });
        return result;
    }

    // handle set
    if(obj instanceof Set){
        const result = new Set();
        seen.set(obj, result);
        obj.forEach(v => {
            result.add(deepClone(v, seen));
        });
        return result;
    }

    // Handle array
    if(Array.isArray(obj)){
        const result = [];
        seen.set(obj, result);
        obj.forEach((value, index)=>{
            result[index] = deepClone(value, seen);
        });
        return result;
    }

    // Handle typed arrays
    if(ArrayBuffer.isView(obj)){
        return new obj.constructor(obj);
    }

    // Handle plain objects
    const result = {};
    seen.set(obj, result);
    for(const key of Object.keys(obj)){
        result[key] = deepClone(obj[key], seen);
    }

    return result;
}

console.log("original Obj = ", obj);
console.log("cloned obj = ", deepClone(obj));

