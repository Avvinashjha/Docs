# Day 5 Challenge — Let’s GO, Avinash

## 🧩 Coding Problem 1 — Easy: First Unique Character

Given a string s, return the index of the first non-repeating character.
If it doesn’t exist, return -1.

Example

Input: "leetcode"
Output: 0

Constraints
 • Time: O(n)
 • Space: O(1) (since alphabet is fixed)

Solution:

```js
function firstNonRepeatingChar(s){
    let set = new Set();
    for(let i = 0; i < s.length; i++){
        if(set.has(s[i])){
            set.delete(s[i]);
        }else{
            set.add(s[i]);
        }
    }

    return s.indexOf(set.keys().next().value);
}
```

⸻

## ⚙️ Coding Problem 2 — Medium: Longest Substring Without Repeating Characters

Given a string s, return the length of the longest substring without repeating characters.

Example

Input: "abcabcbb"
Output: 3   // "abc"

Requirements
 • Solve using sliding window
 • Time: O(n)
 • Space: O(k)

Solution:

```js
function longestSubstringWithoutRepeatingCharacter(s) {
    let left = 0;
    let length = 0;
    let map = new Map();

    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i]) && map.get(s[i]) >= left) {
            left = map.get(s[i]) + 1;
        }
        map.set(s[i], i);
        length = Math.max(length, i - left + 1);
    }

    return length;
}
```

⸻

## 🚀 Coding Problem 3 — Hard: Word Ladder (Shortest Transformation)

You’re given:
 • A beginWord
 • An endWord
 • A wordList

Return the minimum number of transformations required to convert beginWord to endWord, changing one character at a time, AND each intermediate word must exist in wordList.

If no transformation is possible, return 0.

Example

beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]

Output: 5
Explanation: hit -> hot -> dot -> dog -> cog

Requirements
 • Use BFS (classic graph shortest path)
 • Time: O(N × wordLength × 26)

Solution:

```js
function wordLadderLength (beginWord, endWord, wordList){
    // Put word list in a set so that read is fast
    const wordSet = new Set(wordList);

    // If word set does not have the word then we will return 0
    if(!wordSet.has(endWord)) return 0;

    // so now we have to match the pattern
    const patternMap = {};
    const L = beginWord.length;

    // Build the pattern map
    for(let word of wordSet){
        for(let i = 0; i<L; i++){
            const pattern = word.slice(0, i) + "*" + word.slice(i + 1);
            if(!patternMap[pattern]) patternMap[pattern] = [];
            patternMap[pattern].push(word); 
        }
    }

    // Now apply BFS on the patten 
    const queue = [[beginWord, 1]];
    const visited = new Set([beginWord]);

    while(queue.length > 0){
        const [word, level] = queue.shift();

        for(let  i = 0; i < L; i++){
            const pattern = word.slice(0, i) + "*" + word.slice(i + 1);
            if(!patternMap[pattern]) continue;

            for(let nextWord of patternMap[pattern]){
                if(nextWord === endWord) return level + 1;

                if(!visited.has(nextWord)){
                    visited.add(nextWord);
                    queue.push([nextWord, level + 1]);
                }
            }

            // Clear the list to avoid redundant checks
            patternMap[pattern] = [];
        }
    }
    return 0;
}
```

⸻

## 💻 Mini Project — Day 5

Build a Simple “Task Manager API” with Priorities & Filtering

Tech: Node.js or TypeScript preferred (but any JS/TS/Java choice works)

🎯 Requirements

Build an API with the following endpoints:

1. POST /tasks

Create a task
Fields:
 • id (auto)
 • title
 • description
 • priority → "low" | "medium" | "high"
 • status → "pending" | "completed" (default: pending)
 • createdAt
 • updatedAt

Validate required fields.

⸻

2. GET /tasks

Return all tasks with support for filtering & sorting:

Query params:
 • priority=high
 • status=pending
 • sortBy=createdAt | priority
 • order=asc | desc

Examples:

/tasks?priority=high&status=pending
/tasks?sortBy=priority&order=desc

⸻

3. PATCH /tasks/:id

Update any field (title, description, priority, status)

⸻

4. DELETE /tasks/:id

Delete a task.

⸻

Data Storage
 • Keep tasks in memory (array).
 • Each update should change updatedAt.

⸻

⭐ Bonus (Optional)

Add:
 • Pagination → /?page=1&limit=5
 • Search → /tasks?search=meeting

⸻

Solution:

taskService.ts

```ts
import { pool } from "../config/database";
import { CreateTask, Priority, Status, Task, UpdateTask } from "../models/task";
import { GetTaskProps } from "../types/task";



export class TaskService {
  static async getAllTasks({
    limit = 10,
    offset = 0,
    sortBy = "createdAt",
    sortOrder = "DESC",
    priority,
    status,
    search
  }: GetTaskProps) {
    try {
      // 1. Whitelist sortable columns
      const validSortBy = [
        "id",
        "title",
        "priority",
        "status",
        "createdAt",
        "updatedAt",
      ];
      if (!validSortBy.includes(sortBy)) {
        sortBy = "createdAt";
      }

      // 2. Whitelist sort order
      const validSortOrder = ["ASC", "DESC"];
      if (!validSortOrder.includes(sortOrder.toUpperCase())) {
        sortOrder = "DESC";
      }

      // 3. Build WHERE clause dynamically
      const filters: string[] = [];
      const params: any[] = [];

      if (priority) {
        filters.push("priority = ?");
        params.push(priority);
      }

      if (status) {
        filters.push("status = ?");
        params.push(status);
      }

      if (search) {
        filters.push("title LIKE ?");
        params.push(`%${search}%`);
      }

      const whereClause = filters.length
        ? `WHERE ${filters.join(" AND ")}`
        : "";

      // 4. Final SQL
      const sql = `
      SELECT *
      FROM tasks
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ?
      OFFSET ?
    `;

      params.push(limit, offset);

      const [rows] = await pool.execute(sql, params);
      return rows as Task[];
    } catch (error) {
      console.error("Error Fetching Tasks: ", error);
      throw error;
    }
  }

  static async addNewTask(props: CreateTask) {
    try {
      const [result] = await pool.execute(
        "INSERT INTO tasks (title, priority, status) values (?, ?, ?)",
        [props.title, props.priority, props.status]
      );
      return (result as any).insertId;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  static async updateTask(props: UpdateTask, id: number) {
    try {
      const fields: string[] = [];
      const values: any[] = [];

      if (props.title) {
        fields.push("title = ? ");
        values.push(props.title);
      }

      if (props.status) {
        fields.push("status = ? ");
        values.push(props.status);
      }

      if (props.priority) {
        fields.push("priority = ? ");
        values.push(props.priority);
      }

      if (fields.length === 0) {
        throw new Error("No field to update");
      }
      values.push(id);
      const [result] = await pool.execute(
        `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`,
        values
      );
      return (result as any).affectedRows > 0;
    } catch (error) {
      console.log("Error while updating tasks: ", error);
      throw error;
    }
  }

  static async deleteTask(id: number) {
    try {
      const [result] = await pool.execute("DELETE FROM tasks where id = ?", [
        id,
      ]);
      return (result as any).affectedRows > 0;
    } catch (error) {
      console.error("Error while deleting task: ", error);
      throw error;
    }
  }
}

```

taskRoutes.ts

```ts
import { Router, Request, Response } from "express";
import { GetTaskProps } from "../types/task";
import { TaskService } from "../services/taskService";
import { defaultResponse } from "../utils/helper";
import { CreateTask, UpdateTask } from "../models/task";

const notesRouter = Router();


notesRouter.get("/", async (req: Request, res: Response)=>{
    try {
        const {limit, offset, search, sortBy, sortOrder, status, priority}: GetTaskProps = req.query;
        const tasks = await TaskService.getAllTasks({limit, offset, sortBy, sortOrder, priority, status, search});
        res.status(200).json(tasks);
    } catch (error) {
        console.log(" Get /tasks: ", error);
        res.status(500).json(defaultResponse(false, "Error while getting tasks", error as Error))
    }
})

notesRouter.post("/",async (req: Request, res: Response) => {
    try {
        const {title, status, priority}: CreateTask = req.body;
        if(!title || !status || !priority){
            return res.json(defaultResponse(false, "Title, status, priority are required to create a task"))
        }
        const taskId = await TaskService.addNewTask({title, status, priority}); 
        res.status(201).json(defaultResponse(true, `Task created successfully with id ${taskId}`));
    } catch (error) {
        console.error("Error in Post /task: ", error);
        res.status(500).json(defaultResponse(false, "Error while creating new task", error as Error))
    }
})

notesRouter.patch("/:id", async (req: Request, res: Response) => {
    try {
         const id = parseInt(req.params.id);
        if(isNaN(id)){
            return res.status(400).json(defaultResponse(false, "Invalid task id."));
        }
        const {title, status, priority}: UpdateTask = req.body;
        const updated = await TaskService.updateTask({title, status, priority}, id);
        if(!updated){
            return res.status(404).json(defaultResponse(false, "Task not found"));
        }
        res.status(200).json(defaultResponse(true, "Updated successfully"));
    } catch (error) {
        console.error("Update /tasks/:id : ", error);
        res.status(500).json(defaultResponse(false, "Failed to update task", error as Error));
    }
})

notesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if(isNaN(id)){
            return res.status(400).json(defaultResponse(false, "Invalid task id."));
        }
        const deleted = await TaskService.deleteTask(id);
        if(!deleted){
            return res.status(404).json(defaultResponse(false, "Task not found"));
        }
        res.status(200).json(defaultResponse(true, "Deleted successfully"));
    } catch (error) {
        console.error("Delete /tasks/:id : ", error);
        res.status(500).json(defaultResponse(false, "Failed to delete task", error as Error));
    }
})

export default notesRouter;
```

Added 

```ts
app.use("/tasks", taskRouter);
```

and Types are

task.ts

```ts
export type Priority = "low" | "medium" | "high";
export type Status = "pending" | "completed" | "high";
export interface Task {
    id: number;
    title: string;
    priority: Priority;
    status: Status;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTask {
    title: String;
    priority: Priority;
    status: Status;
}

export interface UpdateTask {
    title?:string;
    priority?:Priority;
    status?: Status 
}
```

```ts
import { Priority, Status } from "../models/task";

export interface GetTaskProps {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: string;
  priority?: Priority;
  status?: Status;
  search?: string;
}
```