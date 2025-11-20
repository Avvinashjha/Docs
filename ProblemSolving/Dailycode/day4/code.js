function findMajorityElement(candidates) {
  let count = 0;
  let majorityCandidate = candidates[0];

  for (let i = 0; i < candidates.length; i++) {
    if (count === 0) {
      majorityCandidate = candidates[i];
      count++;
    } else if (majorityCandidate === candidates[i]) {
      count++;
    } else {
      count--;
    }
  }
  return majorityCandidate;
}

// console.log(findMajorityElement([3, 2, 3, 2, 4, 4, 4, 5, 5, 5, 4, 5, 5]));

// find all unique triplets where a + b + c = 0

/**
 * 
 * @param {*} arr 
 * 
 * [-1, 0, 1, 2, -1, -4]
 * [-4, -1, -1, 0, 1, 2]
 * 
 */
function findUniqueTriplets(arr){
    const res = [];
    const map = new Map();
    arr.sort((a,b)=> a - b);

    for(let  i = 0; i< arr.length - 2; i++){
        // skip the duplicates
        if(i > 0 && arr[i] === arr[i-1]) continue;
        
        let left = i+1;
        let right = arr.length - 1;

        while(left < right){
            let sum = arr[i] + arr[left] + arr[right];
            if(sum === 0){
                res.push([arr[i], arr[left], arr[right]]);
                while(left < right && arr[left] === arr[left+1]) left++;
                while(left < right && arr[right] === arr[right-1]) right--;
                left++;
                right--
            }else if(sum < 0){
                left++;
            }else{
                right--;
            }
        }
    }   
    return res;
}

// console.log(findUniqueTriplets([-1, 0, 1, 2, -1, -4]))

function maxProductSubArray(arr){
    if(arr.length === 0) return 0;

    let maxSoFar = arr[0];
    let minSoFar = arr[0];
    let result = arr[0];

    for(let i = 1; i< arr.length; i++){
        const num = arr[i];
        if(num < 0){
            [maxSoFar, minSoFar] = [minSoFar, maxSoFar];
        }

        // update the max and min for current i
        maxSoFar = Math.max(num, maxSoFar * num );
        minSoFar = Math.min(num, num * minSoFar);

        // update the result
        result = Math.max(result, maxSoFar);
    }
    return result;
}
