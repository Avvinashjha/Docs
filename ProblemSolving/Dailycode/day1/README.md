#  Day 1 – Coding & Mini Project Challenge

## Coding Problem 1 – Easy

Problem:
Given an array of integers, return all pairs that sum up to a given target.
Avoid duplicate pairs.

Example:
Input: arr = [2, 4, 3, 5, 7, 8, 9], target = 7
Output: [[2,5],[3,4]]

Solution:












```js 
function targetSum(arr, target){
    if(arr.length < 2) return [];

    // If array is not sorted then sort the array
    arr.sort((a,b)=> a-b);

    // using two pointer approach
    // if sum is greater than target, move right pointer to right -1
    // if sum is less than target, move left pointer to left + 1
    // till left < right 
    // to avoid duplicated we need to track the key

    let left = 0;
    let right = arr.length -1;
    const set = new Set();
    const res = [];

    while(left < right){
        if(set.has(arr[left])){
            left++;
            continue;
        }
        if(set.has(arr[right])){
            right--;
            continue;
        }
        const currentSum = arr[left] + arr[right];
        if(currentSum === target){
            res.push([arr[left], arr[right]]);
            set.add(arr[left]);
            set.add(arr[right]);
            left++;
            right--;
        }else if(currentSum < target){
            left++;
        }else{
            right--;
        }
    }
    return res;
}
```

⸻

## Coding Problem 2 – Medium

Problem:
Implement an LRU (Least Recently Used) Cache with get(key) and put(key, value) operations in O(1) time complexity.
Return -1 if the key doesn’t exist.

Example:

cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
cache.get(1) → 1
cache.put(3, 3) // removes key 2
cache.get(2) → -1

Solution:

```js
/**
 * 
 */
var LRUCache = function(capacity) {
    this.map = new Map();
    this.cap = capacity;
};

/** 
 * 
 */
LRUCache.prototype.get = function(key) {
    const val = this.map.get(key);
    if(val){
        this.map.delete(val);
        this.map.set(key, val);
        return val;
    }
    return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.map.has(key)){
        this.map.delete(key);
    }else if(this.map.size === this.cap){
        const firstKey = this.map.keys().next().value;
        this.map.delete(firstKey);
    }
    this.map.set(key, value);
};
```

⸻

## Coding Problem 3 – Hard

Problem:
You are given a string containing digits.
Return all possible valid IP addresses that can be formed by inserting three dots . in the string.

Example:
Input: "25525511135"
Output: ["255.255.11.135", "255.255.111.35"]

Constraints:
 • An IP segment must be between 0–255.
 • No leading zeros (e.g., “01” is invalid).

 Solution:

- Backtracking approach: We try all possible segment lengths (1, 2, or 3 digits) at each position

- Validation checks:

  - No leading zeros (except single '0')

  - Segment must be between 0-255

  - Must use all characters

  - Must have exactly 4 segments

- Base cases:

  - Success: Used all characters AND have 4 valid segments

  - Failure: Have 4 segments but characters left, OR ran out of characters before 4 segments

 ```js
function allPossibleValidIp(s=""){
    const res = [];

    // Helper function to generate IP Addresses
    function backtrack(start, path, segments){
        // if we'have used all characters and have 4 segments, add to result
        if(segments === 4 && start === s.length){
            res.push(path.join("."));
            return;
        }

        // if we have 4 segments and yet not at the end or at the end but not got 4 segments
        if(segments === 4 || start === s.length){
            return;
        }

        // try segments of length 1, 2, 3
        for(let len = 1; len <=3; len++){
            // check if we have enough character left
            if(start + len > s.length) break;
            const segment = s.substring(start, start + len);

            // check for leading 0 except single 0
            if(segment.length > 1 && segment[0] === '0') continue;

            // check if segment is valid (0-255)
            const num = parseInt(segment);
            if(num > 255) continue;

            // add segment and continue backtracking
            path.push(segment);
            backtrack(start+len, path, segments + 1);
            path.pop(); // backtrack

        }

    }

    backtrack(0, [], 0);
    return res;
}
 ```

⸻

## Mini Project – Frontend (React or Vanilla JS)

Project: Infinite Scroll Table

Goal:
Create a table that displays user data (like name, email, age, etc.) and supports infinite scrolling — new data should load automatically when the user reaches the bottom.

Requirements:
 • Fetch mock data from an API (like <https://dummyjson.com/users> or a static JSON).
 • Show 20 rows initially.
 • When scrolled to bottom → fetch next 20.
 • Add a small loading indicator while fetching.
 • (Optional Bonus) Use React Virtualized / React Window to optimize rendering of large lists.

Solution:

```js
import { useEffect, useState, useCallback, useRef } from 'react'
import { List, useListRef } from 'react-window'
import Loader from '../../components/Loader'
import type { ApiResponse, Data } from '../../types/data'
import { get } from '../../services/baseApi'

const ITEM_HEIGHT = 80 // Height of each row in pixels
const ITEMS_PER_PAGE = 10

function InfiniteScrollList() {
  const [data, setData] = useState<Data[]>([])
  const [offset, setOffset] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const listRef = useListRef(null)
  const isLoadingRef = useRef(false)

  useEffect(() => {
    if (isLoadingRef.current || !hasMore) return
    
    isLoadingRef.current = true
    setLoading(true)
    
    get(`http://localhost:5050/data?limit=${ITEMS_PER_PAGE}&offset=${offset}`)
      .then((response: ApiResponse) => {
        setData((prevState) => [...prevState, ...response.data])
        setHasMore(response.pagination.hasNext)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
      .finally(() => {
        setLoading(false)
        isLoadingRef.current = false
      })
  }, [offset, hasMore])

  // Callback when rows are rendered - used to trigger infinite scroll
  const handleRowsRendered = useCallback(
    (visibleRows: { startIndex: number; stopIndex: number }) => {
      if (loading || !hasMore) return

      // Load more when we're close to the end (within 5 items)
      if (visibleRows.stopIndex >= data.length - 5 && !isLoadingRef.current) {
        setOffset((prev) => prev + ITEMS_PER_PAGE)
      }
    },
    [data.length, loading, hasMore]
  )

  // Row component renderer
  // Custom props that will be passed via rowProps
  type CustomRowProps = {
    items: Data[]
    loading: boolean
  }

  const RowComponent = ({
    index,
    style,
    items,
    loading: isLoading
  }: {
    index: number
    style: React.CSSProperties
    ariaAttributes: {
      'aria-posinset': number
      'aria-setsize': number
      role: 'listitem'
    }
  } & CustomRowProps) => {
    const item = items[index]

    if (!item) {
      return (
        <div style={style}>
          <div
            style={{
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {isLoading && <Loader />}
          </div>
        </div>
      )
    }

    return (
      <div style={style}>
        <div
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            margin: '5px 10px',
            borderRadius: '4px',
            backgroundColor: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <strong>
            {item.first_name} {item.last_name}
          </strong>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Email: {item.email}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {data.length === 0 && loading ? (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <List
            listRef={listRef}
            defaultHeight={window.innerHeight}
            rowComponent={RowComponent}
            rowCount={data.length + (loading && data.length > 0 ? 1 : 0)}
            rowHeight={ITEM_HEIGHT}
            rowProps={{ items: data, loading }}
            onRowsRendered={handleRowsRendered}
            overscanCount={5}
          />
          {!hasMore && data.length > 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '20px',
                color: '#666',
                fontSize: '14px'
              }}
            >
              No more data to load
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default InfiniteScrollList

``
⸻
