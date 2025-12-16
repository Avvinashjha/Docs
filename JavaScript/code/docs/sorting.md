# Sorting Algorithms

## Basic 

### 1. Bubble Sort

Bubble sort is simple comparison based algorithm, where you compare each of the adjacent element and swap them if they are in wrong order and in each pass you last element will be the biggest in the list.

Time Complexity:

- Best case: O(n) -> if array is already sorted
- Avg case: O(n * n)
- Worst Case: O(n * n)

Space complexity:

- It is an in-place sorting algorithm O(1)

For Example:

```txt
5 3 8 4

outer loop i = 0 to n-1
inner loop j = 0 to n - 1 - i (because after each pass the last element will be sorted so no need to check)

inner loop will go from j = 0 to n - 1 - i

inside the inner loop we will check if arr[j] > arr[j+1] 

if true: swap
i = 0;
j = 0;
arr[0] > arr[0+1] : 5 > 3 -> true
    swap(5,3) -> 3 5 8 4

j = 1
arr[1] > arr[2] -> 5 > 8 -> false

j = 2

arr[2] > arr[3] -> 8 > 4 -> true
    swap(8,4) -> 3 5 4 8

Now i will increase by one 

i = 1
j = 0;

arr[0] > arr[1] -> 3 > 5 -> false

j = 1
arr[1] > arr[2] -> 5 > 4 -> true
    swap(5,4) -> 3 4 5 8

since j. can go from 0 to n - 1 - i => 4 - 1 - 1 = 2

so inner loop will break

now i = 2
j = 0

arr[0] > arr[1] -> 3 > 4 -> false

Now j will go to n - 1 - i => 4 - 1 - 2 = 1

Inner loop will break;

since there were now swap in inner loop we will return the array
```

Code:

```js
function bubbleSort(arr){
    let swapped;
    // outer loop will go from 0 to n-1
    for(let i = 0; i < arr.length; i++){
        swapped = false; //  initially swap is false
        for(let j = 0; j < arr.length - 1 - i; j++){
            if(arr[j] > arr[j+1]){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                swapped = true; // since there is a swap then we changed the flag 
            }
        }
        // if no swap happen inside inner loop that means array is sorted
        if(!swapped) break;
    }
    return arr;
}
```

### 2. Selection Sort

Selection sort is a comparison based algorithm, and in this algorithm we select one element and put it on the right place.

so the step is:

- Start from 0 index and assume element at 0 is smallest
- iterate the array if you find any element less that smallest assumed element then swap
- now on each iteration the element in the beginning will be sorted.

```js
function selectionSort(arr){
    for(let i = 0; i< arr.length; i++){
        let smallestElementIndex = i;
        for(let j = i +1; j < arr.length; j++){
            if(arr[j] < arr[smallestElementIndex]){
                smallestElementIndex = j;
            }
        }

        // Now we have smallest element index and we will set that as first element
        const temp = arr[i];
        arr[i] = arr[smallestElementIndex];
        arr[smallestElementIndex] = temp;
    }
    return arr;
}
```

### 3. Insertion Sort



### 4. Shell Sort

## Efficient

### 1. Merge Sort

### 2. Quick Sort

### 3. Heap Sort

### 4. Tim Sort

## No Comparison Sorting

### 1. Counting Sort

### 2. Radix Sort

### 3. Bucket Sort

## Special Purpose Sorting Algo

### 1. Bitonic Sort: Parallel Sorting

### 2. Odd-Even Sort: Parallel Friendly Version of bubble sort

### 3. Pancake Sort: Uses Flips, theoretical

### 4. Cycle Sort: Minimizes Writes

### 5. Cocktail Shaker sort: Bidirectional Bubble Sort

### 6. Comb Sort: Involved Bubble Sort

### 7. Gnome Sort: Similar to insertion sort

### 8. Tree Sort: Uses binary tree

### 9. Bucket-Bridge Sort : Parallel Sorting