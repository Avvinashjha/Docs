# Frequently Asked Questions on Array

## 1. [Two Sum](https://leetcode.com/problems/two-sum/)

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

```text
Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
```

### Approach

#### 1. Brute force

Iterate through the array twice.

```js
function twoSum(nums, target{
    const res = [];

    for(let i = 0; i< nums.length-1; i++){
        for(let j = 1; j < nums.length; j++){
            if(nums[i] + nums[j] === target){
                res.push(i);
                res.push(j);
                return res;
            }
        }
    }
    return res;
})
```

Time Complexity: O(n*n)
Space Complexity: O(1)

#### 2. Using Hashmap

So what I am thinking is we can store the required value in a map, where required value is target - current value if any other element is equal to required value then we found the pair.

```js
function twoSum(nums, target){
    const map = new Map();

    for(let i = 0; i < nums.length; i++){
        const complement = target - nums[i];
        if(map.has(complement)){
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}
```

#### 3. Two Pointer approach

Two pointer approach will work if array is sorted (in case of unsorted array if you sort then you will lose the actual index because after sorting index will not be same)

```js
function twoSum(nums, target){
    nums.sort((a,b)=> a- b);
    let left = 0;
    let right = nums.length -1;

    while(left < right){
        const sum = nums[left] + nums[right];
        if(sum === target){
            return [left, right];
        }else if(sum < target){
            left++;
        }else{
            right++;
        }
    }
    return [];
}
```

## 2. 3 Sum Problem

Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

```txt
Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.

Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.

```

### Approach

#### 1. Brute force

```js
var threeSum = function(nums) {
     const res = new Set();
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1; j < nums.length - 1; j++) {
            for (let k = j + 1; k < nums.length; k++) {

                if (nums[i] + nums[j] + nums[k] === 0) {
                    res.add(JSON.stringify([nums[i], nums[j], nums[k]]));
                }
            }
        }
    }

    return Array.from(res, JSON.parse);
};
```

#### 2. Use Concept from 2 sum 

So in simple term, this is a classic two pointer problem, the idea is for a sorted array we will iterate through the array and inside the iteration we will have two pinter pointing to left of the array and right of the array

`if (i > 0 && nums[i] === nums[i - 1]) continue;`: Here if two consecutive no are same them skip

then set left = i + 1;
right = last element

then loop from left and right and check if sum === 0

if yest then add that to result and check if any element repeats itself. left === left-1 then there is repeating no so we skip similarly for right === right+1 then skip.

```txt
var threeSum = function(nums) {
    if(nums.length < 3) return [];

    const res = [];
    // sort the nums array since index does not matter
    nums.sort((a, b) => a - b);

    // iterate through the array
    for(let i = 0; i < nums.length-2; i++){
        if (i > 0 && nums[i] === nums[i - 1]) continue;
          let left = i+1;
          let right = nums.length -1;
          while(left < right){
            const sum = nums[i] + nums[left] + nums[right];
            if( sum === 0){
                res.push([nums[i], nums[left], nums[right]]);
                while(nums[left] === nums[left+1]) left++;
                while(nums[right] === nums[right-1]) right--;
                right--;
                left++;
            }else if(sum < 0){
                left++;
            }else{
                right--;
            }
          }
    }
    return res;
};
```

