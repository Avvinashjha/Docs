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

/**
 * 4 Sum Problem
 */

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

