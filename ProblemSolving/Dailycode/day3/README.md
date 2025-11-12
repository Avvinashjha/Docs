# Day 3 – Coding & Mini Project Challenge

## Coding Problem 1 – Easy

Problem:
Given an array of integers, return the index of the first element that is equal to its index value (i.e., arr[i] === i).
If no such index exists, return -1.

Example:
Input: [ -3, 0, 2, 3, 10, 5 ]
Output: 2
(Explanation: arr[2] = 2)

Follow-up:
Can you do it in O(log n) if the array is sorted and all elements are distinct?

Solution1: 

Time Complexity: O(n)

```js
function findFirstIndexEqualsValue(arr){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === i){
            return arr[i];
        }
    }
    return -1;
}
```

Solution 2: 

- Array is sorted
- Time COmplexity: O(log(n))
- We can use binary search since array is sorted so if we do not find in mid then if arr[mid] > mid then the item we are looking for is in left else it's in right

```js
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
```

⸻

## Coding Problem 2 – Medium

Problem:
Given a string s, find the length of the longest substring without repeating characters.

Example:
Input: "abcabcbb"
Output: 3
(Explanation: The longest substring is "abc")

Follow-up:
What data structure makes this solution optimal in O(n) time?

Solution 1:

- This problem can be solved using sliding window approach
- so we will start with 0th index and we will move right one by one till there is no repeating character if we got repeating character in right the we will shift our left pointer to right of the first occurrence of that character and so on we will be keeping track of of the maxLength and that will be the answer.

```js
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
```

⸻

## Coding Problem 3 – Hard

Problem:
You are given an array heights representing the heights of buildings.
The “trapping rain water” problem asks: how much water can be trapped after raining?

Example:
Input: [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6

Hint:
Try using two-pointer technique for an O(n) solution.


Solution:

- The amount of water trapped at position i is determined by the minimum of the maximum heights on both sides minus the current height: min(leftMax, rightMax) - heights[i]

Two-pointer approach:

- Use left and right pointers

- Maintain leftMax and rightMax to track the highest bars encountered so far

- Always process the side with the smaller height

```js
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
```

⸻

## Mini Project – Frontend (React / TypeScript)

🎯 Project: “Live Character Counter”

Goal:
Create a small React component that:
 • Has a text input or textarea.
 • Displays:
 • The current character count.
 • Remaining characters allowed (limit: 200).
 • Turns the count red when limit is exceeded.
 • Stores the last input in localStorage so it persists on reload.

Bonus:
 • Add a toggle to switch between light/dark themes using React Context or useReducer.

Main Component:

```ts   
import { useContext, useEffect, useState } from "react";
import "./style.css"
import useLocalStorage from "../../hooks/useLocalStorage";
import ThemeSwitcher from "../ThemeSwitcher";
import { ThemeContext } from "../../contexts/ThemeContext";
const CharacterCounter = () => {
    const [text, setText] = useLocalStorage("text", "");
    const [value, setValue] = useState<string>(text);
    const [isError, setIsError] = useState<boolean>(false);
    const limit = 30; 
    const theme = useContext(ThemeContext);




    const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
        setValue(e.target.value);
        setText(e.target.value);
    }

    useEffect(()=>{
        if(value.length > limit){
            setIsError(true);
        }else{
            setIsError(false);
        }
    }, [value])

    return (
        <div className={theme?.theme === "dark"? "container dark_container": "container"}>
            <ThemeSwitcher/>
            <textarea
            value={value}
            onChange={handleValueChange}
            rows={5}
            />
            <div className={"value_container "}>
                <div className={(isError ? "value error_value" : "value")}>{value}</div>
                <div className="count_indicator">{value.length} / {limit}</div>
            </div>
        </div>
    )
}

export default CharacterCounter;
```

ThemeSwitcher Component

```tsx
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";


function ThemeSwitcher() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null; // safety check

  const { theme, setTheme } = themeContext;

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Switch to {theme === "dark" ? "light" : "dark"} mode
    </button>
  );
}

export default ThemeSwitcher;
```

useLocalStorageHook

```ts
import { useEffect, useState } from "react";

function useLocalStorage(key: string, initialValue: string){
    // load initial value
    const [storedValues, setStoredValues] = useState(()=>{
        const item = localStorage.getItem(key);
        return item !== null ? item : initialValue;
    })

    // update local storage whenever the value changes
    useEffect(()=>{
        localStorage.setItem(key, storedValues);
    }, [key, storedValues])
    return [storedValues, setStoredValues] as const;
}

export default useLocalStorage;
```