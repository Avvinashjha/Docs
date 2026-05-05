// given a sorted array apply binary search

function binarySearch(nums, k){
    let left = 0;
    let right = nums.length - 1;
    while(left <=  right){
        let mid = Math.floor(left + (right - left) / 2);
        if(nums[mid] === k){
            return true;
        }
        if(nums[mid] < k){
            left = mid + 1;
        }else{
            right = mid -1 ;
        }
    }
    return false;
}

function firstOccurrenceOfElement(nums, target){
    let left = 0;
    let right = nums.length - 1;
    let ans = -1;

    while(left <= right){
        let mid = Math.floor(left + (right + left) / 2);
        if(nums[mid] === target){
            ans = mid;
            right = mid -1; // keep searching left
        }else if(nums[mid] < target){
            left = mid + 1;
        }else{
            right = mid - 1;
        }
    }
    return ans;
}

function lastOccurrenceOfElement(nums, target){
    let left = 0;
    let right = nums.length - 1;
    let ans = -1;
    while(left <= right){
        let mid = Math.floor(left + (right + left)/2);
        if(nums[mid] === target){
            ans = mid;
            mid = mid + 1; // continue to right
        }else if(nums[mid] < target){
            left = mid + 1;
        }else{
            right = mid - 1;
        }
    }
    return ans;
}

function firstAndLastPositionInSortedArray(nums, target){
    function getFirst(){
        let left = 0;
        let right = nums.length - 1;
        let ans = -1;

        while(left <= right){
            let mid = Math.floor((left + right) / 2);
            if(nums[mid] === target){
                ans = mid;
                right = mid - 1;
            }else if(nums[mid] < target){
                left = mid + 1;
            }else{
                right = mid - 1;
            }
        }
        return ans;
    }
    function getLast(){
        let left = 0;
        let right = nums.length - 1;
        let ans = -1;

        while(left <= right){
            let mid = Math.floor((left + right) / 2);
            if(nums[mid] === target){
                ans = mid;
                left = mid + 1;
            }else if(nums[mid] < target){
                left = mid + 1;
            }else{
                right = mid - 1;
            }
        }
        return ans;
    }
    return [getFirst(), getLast()];
}

function countOccurrence(nums, target){
    function getFirst(){
        let left = 0;
        let right = nums.length - 1;
        let ans = -1;
        while(left <= right){
            let mid = Math.floor((left + right) / 2);
            if(nums[mid] === target){
                ans = mid;
                right = mid - 1;
            }else if(nums[mid] < target){
                left = mid + 1;
            }else{
                right = mid - 1;
            }
        }
        return ans;
    }
    function getLast(){
      let left = 0;
      let right = nums.length - 1;
      let ans = -1;
      while(left <= right){
          let mid = Math.floor((left + right) / 2);
          if(nums[mid] === target){
              ans = mid;
              left = mid + 1;
          }else if(nums[mid] < target){
              left = mid + 1;
          }else{
              right = mid - 1;
          }
      }
      return ans;
    }
    return getLast() - getFirst();
}

function findMinimumInRotatedSortedArray(nums){
    let left = 0;
    let right = nums.length - 1;

    while(left < right){
        let mid = Math.floor((left + right) / 2);
        if(nums[mid] > nums[right]){
            left = mid + 1;
        }else{
            right = mid;
        }
    }
    return nums[left];
}

function searchInRotatedSortedArray(nums, target){
    let left = 0;
    let right = nums.length - 1;

    while(left <= right){
        let mid = Math.floor((left + right) / 2);
        if(nums[mid] === target){
            return mid;
        }

        // check if left half is sorted
        if(nums[left] <= nums[mid]){
            if(nums[left] < target && target > nums[mid]){
                right = mid - 1;
            }else{ 
                left = mid + 1;
            }
        }

        // check if right half is sorted
        else{
            if(nums[mid] < target && nums[right] >= target){
                left = mid+ 1;
            }else{
                right = mid - 1;
            }
        }
    }
    return -1;
}

function peakElement(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        

        if (nums[mid] < nums[mid + 1]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return nums[left];
}
/**
 * 
 * @param {*} nums [][]
 * @param {*} target 
 * 
 * 1  2  3  4  5
 * 6  7  8  9  10
 * 11 12 13 14 15
 * 16 17 18 19 20
 * 
 * Time Complexity: n log(n)
 */
function searchInSortedMatrixV1(nums, target){
    function binarySearch(arr, target){
        let left = 0;
        let right = arr.length - 1;

        while(left <= right){
            let mid= Math.floor((left + right)/ 2);
            if(arr[mid] === target){
                return mid;
            }else if(arr[mid] < target){
                left = mid + 1;
            }else{
                right = mid - 1;
            }
        }
        return -1;
    }
    for(let i = 0 ; i < nums.length; i++){
        const foundIndex = binarySearch(nums[i], target);
        if(foundIndex !== -1){
            return [i, foundIndex];
        } 
    }
    return [-1, -1];
}

function searchInSortedMatrix(nums, target){
    // find the row item with min diff
    let row = -1;
    let rowDiff = Infinity;
    let left = 0 ;
    let right = nums.length -1;
    while(left <= right){
        let mid = Math.floor((left + right) / 2);

        if(nums[mid][0] === target){
            row = mid;
        }else if(nums[mid][0] < target){
            const currDiff = Math.abs(target - nums[mid][0]);
            if(currDiff < rowDiff){
                rowDiff = currDiff;
                row = mid;
            }
            left = mid + 1;
        }else{
            right = mid - 1;
        }
    }
    console.log(row);
    

    left = 0;
    right = nums[row].length -1;
    while(left <= right){
        let mid = Math.floor((left + right) / 2);
        if(nums[row][mid] === target){
            return [row, mid];
        }else if(nums[row][mid] < target){
            left = mid + 1;
        }else{
            right = mid - 1;
        }
    }
    return [-1, -1]
}

m.forEach()
console.log(searchInSortedMatrix([[1,2,3,4,5], [6,7,8,9,10,11], [12, 13, 14, 15, 16]], 13));

