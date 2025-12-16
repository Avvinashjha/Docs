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

const map = new Map();
map.delete()
const set = new Set();
let arr = [5,3,8,4];
console.log(arr);
// arr.bubbleSort();
arr.selectionSort();
console.log(arr);

