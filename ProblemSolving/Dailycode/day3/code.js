function findFirstIndexEqualsValue(arr){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === i){
            return arr[i];
        }
    }
    return -1;
}

// console.log(findFirstIndexEqualsValue([ -3, 0, 2, 3, 10, 5 ]));

function findFirstIndexEqualsValueSorted(arr){
    let left = 0;
    let right = arr.length - 1;

    while(left <= right){
        const mid = Math.floor((left+right)/2);

        if(arr[mid] === mid){
            return mid;
        }else if(arr[mid] < mid){
            left = mid + 1;
        }else{
            right = mid - 1;
        }
    }
    return -1;
}

// Longest substring without repeating character
//abcabcbb
function longestSubstringWithoutRepeatingChar(s=""){
    let left = 0;
    const map = new Map();
    let maxLength = 0;

    for(let i = 0; i < s.length; i++){
        const char = s[i];
        if(map.has(char) && map.get(char) >= left){
            left = map.get(s.charAt(i)) + 1;
        }
        map.set(char, i);
        maxLength = Math.max(maxLength, i - left + 1);
    }
    return maxLength;
}

// console.log(longestSubstringWithoutRepeatingChar("abcabcbb"));

function trapRainWater(heights){
    const n = heights.length;
    if(n === 0) return 0;

    let left = 0;
    let right = heights.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    while(left < right){
        if(heights[left]< heights[right]){
            // Process left side
            if(heights[left] >= leftMax){
                leftMax = heights[left];
            }else{
                water += leftMax - heights[left];
            }
            left++;
        }else{
            //process right side
            if(heights[right]>= rightMax){
                rightMax = heights[right];
            }else{
                water += rightMax - heights[right];
            }
            right--;
        }
    }
    return water;
}

console.log(trapRainWater([0,1,0,2,1,0,1,3,2,1,2,1]));
