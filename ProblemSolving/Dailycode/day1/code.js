/**
 * Given an array of integers, return all pairs that sum up to a given target. Avoid duplicate pairs.
 * Input: arr = [2, 4, 3, 5, 7, 8, 9], 
 * target = 7 
 * Output: [[2,5],[3,4]]
 */

function targetSum(arr, target){
    if(arr.length < 2) return [];

    // If array is not sorted then sort the array
    arr.sort((a,b)=> a-b);

    // using two pointer approach
    // if sum is greater than target, move right pointer to right -1
    // if sum is less than target, move left pointer to left + 1
    // till left < right 
    // to avoid duplicated we need to track the key

    let left = 0;
    let right = arr.length -1;
    const set = new Set();
    const res = [];

    while(left < right){
        if(set.has(arr[left])){
            left++;
            continue;
        }
        if(set.has(arr[right])){
            right--;
            continue;
        }
        const currentSum = arr[left] + arr[right];
        if(currentSum === target){
            res.push([arr[left], arr[right]]);
            set.add(arr[left]);
            set.add(arr[right]);
            left++;
            right--;
        }else if(currentSum < target){
            left++;
        }else{
            right--;
        }
    }
    return res;
}

// const res = targetSum([2, 4, 3, 5, 7, 8, 9], 7);
// console.log(res);

/**
 * Implement LRUCache - Least recently used cache with get(key) and put(key, value) operation in O(1) time
 * return -1 if the key doesn't exists.
 * 
 * cache = LRUCache(2)
 * cache.put(1, 1)
 * cache.put(2, 2)
 * cache.get(1) → 1
 * cache.put(3, 3) // removes key 2
 * cache.get(2) → -1
 * 
 */

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.map = new Map();
    this.cap = capacity;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    const val = this.map.get(key);
    if(val){
        this.map.delete(val);
        this.map.set(key, val);
        return val;
    }
    return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.map.has(key)){
        this.map.delete(key);
    }else if(this.map.size === this.cap){
        const firstKey = this.map.keys().next().value;
        this.map.delete(firstKey);
    }
    this.map.set(key, value);
};

// const l = new LRUCache(5);
// console.log(l.get(1));
// l.put(1,2);
// console.log(l.get(1));

/**
 * You are given a string containing digits. Return all possible valid ip
 */

function allPossibleValidIp(s=""){
    const res = [];

    // Helper function to generate IP Addresses
    function backtrack(start, path, segments){
        // if we'have used all characters and have 4 segments, add to result
        if(segments === 4 && start === s.length){
            res.push(path.join("."));
            return;
        }

        // if we have 4 segments and yet not at the end or at the end but not got 4 segments
        if(segments === 4 || start === s.length){
            return;
        }

        // try segments of length 1, 2, 3
        for(let len = 1; len <=3; len++){
            // check if we have enough character left
            if(start + len > s.length) break;
            const segment = s.substring(start, start + len);

            // check for leading 0 except single 0
            if(segment.length > 1 && segment[0] === '0') continue;

            // check if segment is valid (0-255)
            const num = parseInt(segment);
            if(num > 255) continue;

            // add segment and continue backtracking
            path.push(segment);
            backtrack(start+len, path, segments + 1);
            path.pop(); // backtrack

        }

    }

    backtrack(0, [], 0);
    return res;
}

// Test cases
console.log(allPossibleValidIp("25525511135"));
// Output: ["255.255.11.135", "255.255.111.35"]

console.log(allPossibleValidIp("0000"));
// Output: ["0.0.0.0"]

console.log(allPossibleValidIp("101023"));
// Output: ["1.0.10.23", "1.0.102.3", "10.1.0.23", "10.10.2.3", "101.0.2.3"]




let arr = [2, 4, 3, 5, 7, 8, 9, 0];

function findTargetSum(arr=[], target){
    const temp = [];
    const res = [];

    for(let i = 0; i< arr.length; i++){
        const needed = target - arr[i];
        if(temp.includes(needed)){
            res.push([needed, arr[i]]);
        }else{
            temp.push(arr[i]);
        }
    }
    return res;
}


console.log(findTargetSum([2, 4, 3, 5, 7, 8, 9], 7));