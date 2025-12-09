# Recursion and Backtracking

## What is Recursion?

Any function which call itself is called **recursive**. A recursive method solves a problem by calling a copy of itself to work on smaller problem. This is called **recursion step**.

```js
function recur(n){
    if(BASE_CASE){
        return ans;
    }
    // work + recursive call
    return something + recur(smaller_iput);
}
```

### 1. Bade case

- The condition where recursion stops.
- Mandatory, otherwise: infinite recursion. -> stack overflow

Example

```js
function fact(n){
    if(n == 0) return 0; // base case
    return n * fact(n-1); // recursive case
}
```

Edge Case

- Negative Input
- Very Large input -> stack overflow
  
### 2. Recursive Case

You break the problem into smaller parts

### 3. Stack Frames (Call Stack)

Each recursive call adds a new copy of function to stack.

Example fact(3)

- fact(3) -> fact(2)
- fact(2) -> fact(1)
- fact(1) -> fact(0)

Then values return backward.

### 4. Tail Recursion

If the recursion call is the last statement -> compiler optimization possible

Example:

```js
function tail_fact(n, int res = 1){
    if(n == 0) return result;
    return tail_fact(n-1, result * n);
}
```

### 5. Types of Recursion

1. Linear Recursion -> one recursive call
2. Binary Recursion -> two recursive calls
3. Multiple Recursion -> more than two calls
4. Indirect Recursion -> A call B, B calls A

### 6. Classic Recursion Examples

Example 1: Fibonacci (Exponential Recursion)

```js
int fib(int n){
    if(n <= 1) return n;
    return fib(n-1) + fib(n-2);
}
```

Edge Case

- Overflow for large n
- Exponential Time Complexity O(2^n)

Example 2: Print 1 to N

Forward:

```js
void print1(int n){
    if(n == 0) return;
    print(n-1);
    console.log(n);
}
```

Backward

```js
void print2(int n){
    if(n == 0) return ;
    console.log(n);
    print(n-1);
}
```

## What is Backtracking?

Backtracking = recursion + undo steps.

Used For:

- permutations
- combinations
- subset generation
- N-Queens
- Sudoku
- Maze Problem

### 1. How Backtracking works?

At each step, you have 3 actions

1. choose
2. Explore (recursive call)
3. Un-choose (undo the changes)

### 2. Syntax

```js
function solve(current_state){
    if(goal_reached) store_answer;
    for(each valid choice c){
        apply choice c; // choose
        solve(updated_State); // explore
        undo choice c; // un-choose
    }
}
```

### 3. Examples of Backtracking

Example 1: Generate all subsets

```ini
set = [1,2,3];
subsets = [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]
```


## Pure Recursion Problems