// Merge interval so that none is overlapping

let a = [[2,5], [3,6], [1,3], [9, 11], [3,5]]

function mergeOverlappingIntervals(intervals){
    const sortedInterval = a.sort((a, b)=> a[0] - b[0]);
    
    let currentStart = sortedInterval[0][0];
    let currentEnd = sortedInterval[0][1];

    for(let i = 1; i < intervals.length; i++ ){
        if(currentStart > sortedInterval[i][0]){
            
        }
    }
}

mergeOverlappingIntervals(a);