# Day 4 Challenge is here!

## 🧩 Coding Problem 1 – Easy

Problem:
You are given an array of integers.
Return the majority element — the one that appears more than n/2 times in the array.
If there’s no such element, return -1.

Example:
Input: [3, 2, 3]
Output: 3

Follow-up:
Can you do it in O(n) time and O(1) space (hint: Boyer–Moore Voting Algorithm)?

Solution:

- According to Boyer-Moore Voting algorithm 
- init the count variable to 0
- if count is zero and you are looking a an element in the array then set that element as majority element
- go to next element of that element is same as the majority element increase the count else decrease the count 
- and then if count is zero the current element is majority element so traverse the whole array and in the end you will get the majority element

```js
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
```

⸻

## ⚙️ Coding Problem 2 – Medium

Problem:
Given an integer array nums, find all unique triplets [a, b, c] such that
a + b + c == 0.

Example:
Input: [-1, 0, 1, 2, -1, -4]
Output: [[-1, -1, 2], [-1, 0, 1]]

Constraints:
 • Solution must not contain duplicate triplets.
 • Target time complexity: O(n²) using two-pointer technique after sorting.

Solution:

- So the basic idea is sort the array and then for each element check in the array for the pair for which the current element sums to 0

```js
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
```

⸻

## 🚀 Coding Problem 3 – Hard

Problem:
Given an array of integers nums, find the maximum product subarray.
The product can be negative, so handle sign flips carefully.

Example:
Input: [2,3,-2,4]
Output: 6
(Explanation: [2,3] has the largest product)

Hint:
Track both maxProduct and minProduct at each step — a negative times a negative can become max again.

Solution:

```js
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
```

⸻

## 💻 Mini Project – Backend (Node.js / Express)

🧠 Project: “Basic Notes API”

Goal:
Build a small REST API to manage text notes.

Requirements:
Endpoints:

 1. POST /notes → create a note
    - body: { title, content }
 2. GET /notes → get all notes
 3. GET /notes/:id → get a single note
 4. DELETE /notes/:id → delete a note

Implementation details:
 • Store notes in an in-memory Map or array.
 • Each note should have a unique id (use uuid or crypto.randomUUID()).
 • Include basic validation (title/content required).
 • Return proper HTTP status codes and JSON responses.

Bonus:
 • Add a /search?q=<term> route to filter notes by title/content substring.
 • Add createdAt timestamps for each note.

Solution:

```ts
import { Router, Request, Response } from "express";
import crypto from "crypto";

const noteRouter = Router();

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

interface NoteInput {
  title: string;
  content: string;
  tags: string;
}

const notes: Note[] = [
  {
    id: crypto.randomUUID(),
    title: "Note-1",
    content: "This is the first note",
    tags: ["test", "java", "backend"],
    createdAt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    title: "Note-2",
    content: "This is the second note",
    tags: ["test", "javascript", "nodejs"],
    createdAt: new Date().toISOString()
  }
];

// GET / - all notes or filtered
noteRouter.get("/", (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (typeof q === "string" && q.trim().length > 0) {
      const filteredNotes = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(q.toLowerCase()) ||
          note.content.toLowerCase().includes(q.toLowerCase()) ||
          note.tags.some((tag) => tag.toLowerCase().includes(q.toLowerCase()))
      );
      return res.status(200).json({ success: true, data: filteredNotes });
    }

    return res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.error("Error in GET /notes", error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching notes"
    });
  }
});

// GET /:id - get note by id
noteRouter.get("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = notes.find((item) => item.id === id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note does not exist",
        id
      });
    }

    return res.status(200).json({ success: true, data: note });
  } catch (error) {
    console.error("Error /notes/:id : ", error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching the note"
    });
  }
});

// POST / - create new note
noteRouter.post("/", (req: Request<{}, {}, NoteInput>, res: Response) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required"
      });
    }

    const note: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      tags: tags.split(",").map((t) => t.trim()),
      createdAt: new Date().toISOString()
    };

    notes.push(note);
    return res.status(201).json({ success: true, data: note });
  } catch (error) {
    console.error("Error while POST /notes:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to insert note"
    });
  }
});

export default noteRouter;

```

⸻
