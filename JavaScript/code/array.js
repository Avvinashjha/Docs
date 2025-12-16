/**
 * 2 Sum Problem
 * 
 * https://leetcode.com/problems/two-sum/description/
 * 
 * Given an array of integers nums and an integer target, 
 * return indices of the two numbers such that they add up to target.
 */

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


/**
 * 3 Sum Problem
 */

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

/**
 * 4 Sum Problem
 */
var fourSum = function(nums, target) {
    if(nums.length < 4) return [];
    nums.sort((a,b)=> a - b);
    const res = [];
    for(let i = 0; i< nums.length-3; i++){
        if(i > 0 && nums[i] === nums[i-1]) continue; 
        for(let j = i + 1; j < nums.length -2; j++){
            if(j > i + 1 && nums[j] === nums[j-1])continue;
            let left = j + 1;
            let right = nums.length - 1;

            while(left < right){
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if( sum === target){
                    res.push([nums[i], nums[j], nums[left], nums[right]]);
                    while(left< right && nums[left] === nums[left+1]) left++;
                    while(left < right && nums[right] === nums[right+1]) right--;
                    left++;
                    right--;
                }else if(sum < target){
                    left++;
                }else{
                    right--;
                }
            }
        }
    }
    return res;
};
/**
 * Sort Colors
 */

/**
 * Container with Most Water
 */

/**
 * Remove Duplicates from sorted Array -II
 */

/**
 * 2 Sum Problem II
 */

/**
 * Minimum No of Platform
 */

/**
 * Interval List Intersection
 */

/**
 * Kaden's Algorithm
 */

/**
 * Binary search in a sorted array
 */

/**
 * Merge two sorted array
 */

/**
 * Rotate an array 
 */

/**
 * Longest substring without repeating character
 */

/**
 * Longest Subarray with sum <= k
 */

/**
 * Longest subarray with equal 0s and 1s
 */

/**
 * Longest Repeating character replacement
 */

/**
 * Sub Array Product less than k
 */

/**
 * Minimum size subarray sum
 */

/**
 * Fruit into basket
 */

/**
 * Find First and Last Position of Target in sorted array
 */

/**
 * Peak Element / Peak in the Mountain array
 */

/**
 * Product of Array Except self
 */

/**
 * Maximum subarray sum after one deletion
 */

/**
 * Find Pivot / equilibrium index
 */

