# Day 2 – Coding & Mini Project Challenge

## Coding Problem 1 – Easy

Problem:
Given a string s, return the first non-repeating character in it.
If there’s no unique character, return "_".

Example:
Input: s = "aabbcddde"
Output: "c"

Follow-up:
What’s the most optimal way (time and space) to do this?

Solution:

- Iterate through the string
- make a set of characters where visited chars will be tracked
- make a set of unique chars where only unique chars will remain
- then return the first unique char inserted in the set

```js
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
```

Time Complexity:

- String iteration O(n)
- Space Complexity O(n) as we are storing each chars

⸻

⚙️ Coding Problem 2 – Medium

Problem:
Given a list of meeting time intervals [[start1, end1], [start2, end2], ...],
determine if a person can attend all meetings (no overlaps).

Example:
Input: [[0,30],[5,10],[15,20]]
Output: false

Input: [[7,10],[2,4]]
Output: true

Follow-up:
If you had to merge all overlapping meetings instead of just checking for conflicts — how would you modify your solution?

Solution

- Sort the array based on start time
- then check if any end time of current meet is overlapping with start of other meet if yes then false

```js
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
```

IF You have to merge 

```js
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

console.log(mergeMeet([[0,30],[5,10],[15,20]]));
```

⸻

🚀 Coding Problem 3 – Hard

Problem:
You are given an array of integers.
Find the length of the longest increasing subsequence (LIS).

Example:
Input: [10,9,2,5,3,7,101,18]
Output: 4
(Explanation: The LIS is [2,3,7,101])

Constraints:
 • Time complexity target: O(n log n) (Hint: use binary search + DP)

Solution:

- Implemented this but not took help so i need to work on these problems type related to sub-array, substring, subsequence related problems

```js
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
```
⸻

💻 Mini Project – Backend (Node.js or Java)

Project: Simple URL Shortener Service 🔗

Goal:
Build a minimal backend API that:
 • Accepts a long URL and returns a short URL (e.g., <https://short.ly/abc123>)
 • Redirects the short URL to the original URL
 • Stores mappings in memory (for now)

Requirements:
 • POST /shorten → body: { "url": "<https://some-long-url.com/page>" }
→ returns { "shortUrl": "<https://short.ly/abc123>" }
 • GET /:id → redirects to original URL
 • Use in-memory Map (or Java HashMap) for storage
 • Generate random short IDs (6–8 characters)

Bonus:
 • Validate that input URL is valid before shortening
 • Track the number of times each short link was visited


Solution:

index.ts (main file)
```ts
import express, {Request, Response} from "express";
import { UrlService } from "./services/urlService";

const app = express();

const port = process.env.PORT || 5050;

// Middle ware
app.use(express.json());

app.get("/tiny", async (req: Request, res: Response) => {
  const url = req.query.url;

  // Validate query param
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing or invalid ?url parameter" });
  }

  try {
    const code = await UrlService.shortUrl(url); // now returns short code
    const shortUrl = `${req.protocol}://${req.get("host")}/tiny/${code}`;
    return res.json({ shortUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/tiny/:code", async (req: Request, res: Response) => {
  const code = req.params.code;

  const actualUrl = await UrlService.getActualUrl(code);

  if (!actualUrl) {
    return res.status(404).send("Short URL not found");
  }

  return res.redirect(302, actualUrl);
});


app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`);
    
})

```

urlService.ts

```ts
import { pool } from "../config/database";
import { randomBase62 } from "../utils/hashCode";

export class UrlService {
  static async shortUrl(actual_url: string) {
    while (true) {
      const code = randomBase62(6);

      try {
        await pool.execute(
          `INSERT INTO url_mapping (hash_id, actual_url, expiration_date, creating_date)
         VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 2 DAY), NOW())`,
          [code, actual_url]
        );

        return code;
      } catch (err: any) {
        if (err.code === "ER_DUP_ENTRY") continue;
        throw err;
      }
    }
  }

  static async getActualUrl(code: string) {
    try {
      const [rows] = await pool.execute(
        "SELECT actual_url FROM url_mapping WHERE hash_id = ?",
        [code]
      );

      const result = (rows as any)[0];
      return result ? result.actual_url : null;
    } catch (error) {
      console.error("Error while fetching actual url:", error);
      throw error;
    }
  }
}
```

randomBase62 method

```ts
export function randomBase62(length: number){
    let out = "";
    for(let i = 0; i< length; i++){
        const index = crypto.randomInt(62);
        out += BASE62[index];
    }
    return out;
}
```