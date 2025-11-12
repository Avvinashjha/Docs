/**
 * Iterate through the string and store the characters in a set
 * for each character check if that character is already in set
 * if yes then ignore else make that character as unique and insert into a set of unique characters
 * and get the first element
 * @param {*} s 
 */

function getFirstNonRepeatingCharacter(s="h"){
    const chars = new Set();
    const uniqueChars = new Set();

    for(let i = 0; i <s.length; i++){
        if(!chars.has(s.charAt(i))){
            chars.add(s.charAt(i));
            uniqueChars.add(s.charAt(i));
        }else{
            uniqueChars.delete(s.charAt(i));
        }
    }

    return uniqueChars.keys().next().value;
}

// console.log(getFirstNonRepeatingCharacter("aabbcddde"));

function canAttendAllMeet(arr){
    // Sort the array based on start time
    arr.sort((a, b)=> a[0] - b[0]);

    for(let i = 0; i< arr.length-1; i++){
        if(arr[i][1] > arr[i+1][0] ){
            return false;
        }
    }
    return true;
}

console.log(canAttendAllMeet([[0,30],[5,10],[15,20]]));
console.log(canAttendAllMeet([[7,10],[2,4]]));

// Now If have to merge the meetings then when end time is greater than next end time then merge those

function mergeMeet(arr){
    // Sort the array based on start time
    arr.sort((a, b)=> a[0] - b[0]);
    const res = [arr[0]];
    
    for(let i = 1; i <arr.length; i++){
        const current = arr[i];
        const lastMerged = res[res.length - 1];

        // Check if current interval overlaps with last merged interval
        if(current[0] <= lastMerged[1] ){
            // Merge them by updating the end time
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        }
        else{
            res.push(current);
        }
    }
    return res;
}

// console.log(mergeMeet([[0,30],[5,10],[15,20]]));

function lengthOfLIS(nums){
    if(nums.length === 0) return 0;

    const tails = [];

    for(let num of nums){
        // Binary search to find the position to replaced or append
        let left = 0;
        let right = tails.length;

        while(left < right){
            const mid = Math.floor((left+right)/2);
            if(tails[mid]< num){
                left = mid + 1;
            }else{
                right = mid;
            }
        }

        // oif position is at the end, append the number
        // other wise replace the element at that position
        if(left === tails.length){
            tails.push(num);
        }else{
            tails[left] = num;
        }
    }
    return tails.length;
}

console.log(lengthOfLIS([10,9,2,5,3,7,101,18]));

