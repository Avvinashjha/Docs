/**
 * Selection sort
 */

Array.prototype.selectionSort = function (){
    for(let i = 0; i < this.length; i++){
         let smallest = i;
        for(let j = i+1; j < this.length; j++){
            if(this[j] < this[smallest]){
                smallest = j;
            }
        }
        const temp = this[i];
        this[i] = this[smallest];
        this[smallest] = temp;
    }
    return this;
}

/**
 * Bubble Sort
 */

Array.prototype.bubbleSort = function(){
    let swapped;

    for(let i = 0; i < this.length -1; i++){
        swapped = false;

        // Each pass move the largest element to the end
        // so we can ignore the last i elements
        for(let j = 0; j < this.length -1 - i; j++){
            if(this[j] > this[j + 1]){
                const temp = this[j];
                this[j] = this[j+1];
                this[j+1] = temp;
                swapped = true;
            }
        }

        // If no elements were swapped, the array is sorted
        if(!swapped) break;
    }
    return this;
}

// const map = new Map();
// map.delete()
// const set = new Set();
// let arr = [5,3,8,4];
// console.log(arr);
// // arr.bubbleSort();
// arr.selectionSort();
// console.log(arr);

/**
 * Merge Sort
 * n(log(n))
 */

function mergeSortIterative(arr) {
    const n = arr.length;
    const temp = new Array(n);

    for (let size = 1; size < n; size *= 2) {
        for (let left = 0; left < n - size; left += 2 * size) {
            const mid = left + size - 1;
            const right = Math.min(left + 2 * size - 1, n - 1);

            merge(arr, temp, left, mid, right);
        }
    }
    return arr;
}

function merge(arr, temp, left, mid, right) {
    let i = left;
    let j = mid + 1;
    let k = left;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }

    while (i <= mid) {
        temp[k++] = arr[i++];
    }

    while (j <= right) {
        temp[k++] = arr[j++];
    }

    for (let p = left; p <= right; p++) {
        arr[p] = temp[p];
    }
}

// const res = mergeSortIterative([4, 3, 18, 2, 21, 64, 9, 8]);
// console.log(res);

