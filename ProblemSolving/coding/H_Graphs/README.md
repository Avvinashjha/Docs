# Complete Graph DSA Roadmap

A structured roadmap for mastering Graphs for interviews, competitive programming, and problem solving.

---

# Phase 0: Prerequisites

Before graphs, make sure you are comfortable with:

* Arrays
* HashMaps / Sets
* Recursion
* Queues
* Stacks
* Priority Queue / Heap
* Sorting
* Basic Trees

Recommended problems:

1. Two Sum
2. Valid Parentheses
3. Binary Tree Level Order Traversal
4. Implement Queue using Stacks
5. Kth Largest Element in an Array

---

# Phase 1: Graph Fundamentals

## 1. Graph Terminology

Learn:

* Vertex / Node
* Edge
* Directed graph
* Undirected graph
* Weighted graph
* Unweighted graph
* Connected graph
* Disconnected graph
* Cyclic graph
* Acyclic graph
* Degree / indegree / outdegree
* Path
* Simple path
* Dense graph
* Sparse graph

---

## 2. Graph Representation

Learn:

### Adjacency Matrix

* Space complexity
* Edge lookup
* Dense graphs

### Adjacency List

* Most commonly used
* Space efficient
* Sparse graphs

### Edge List

* Used in Kruskal
* Useful for edge processing

### Implicit Graphs

Examples:

* Grid
* Word transformations
* State transitions

Practice Problems:

1. Find if Path Exists in Graph
2. Design Graph With Shortest Path Calculator
3. Clone Graph

---

# Phase 2: Graph Traversal

## 3. Breadth First Search (BFS)

Learn:

* Queue based traversal
* Level order traversal
* Shortest path in unweighted graph
* Multi-source BFS
* BFS on matrix/grid

Patterns:

* Shortest distance
* Minimum steps
* Wave expansion

Important Problems:

Easy:

1. Binary Tree Level Order Traversal
2. Find if Path Exists in Graph
3. Flood Fill

Medium:

4. Number of Islands
5. Rotting Oranges
6. Open the Lock
7. Word Ladder
8. Walls and Gates
9. Nearest Exit from Entrance in Maze
10. Shortest Path in Binary Matrix
11. Pacific Atlantic Water Flow
12. As Far from Land as Possible
13. Bus Routes

Hard:

14. Minimum Moves to Reach Target with Rotations
15. Escape a Large Maze

---

## 4. Depth First Search (DFS)

Learn:

* Recursive DFS
* Iterative DFS
* Backtracking style DFS
* DFS tree
* Entry/exit time

Patterns:

* Exploration
* Components
* Path existence
* Backtracking

Important Problems:

Easy:

1. Number of Provinces
2. Flood Fill
3. Find if Path Exists in Graph

Medium:

4. Number of Islands
5. Max Area of Island
6. Surrounded Regions
7. Pacific Atlantic Water Flow
8. Keys and Rooms
9. Reconstruct Itinerary
10. Course Schedule
11. Course Schedule II
12. Clone Graph
13. Evaluate Division

Hard:

14. Word Search II
15. Remove Invalid Parentheses

---

# Phase 3: Matrix and Grid Graphs

## 5. Grid BFS/DFS

Learn:

* Direction arrays
* Boundary checking
* Visited marking
* Multi-source BFS
* 4-direction and 8-direction movement

Important Problems:

1. Number of Islands
2. Max Area of Island
3. Rotting Oranges
4. Shortest Path in Binary Matrix
5. Surrounded Regions
6. Walls and Gates
7. Pacific Atlantic Water Flow
8. Making a Large Island
9. Number of Enclaves
10. Island Perimeter
11. Word Search
12. Knight Probability in Chessboard
13. Minimum Knight Moves

---

# Phase 4: Cycle Detection

## 6. Cycle Detection in Undirected Graph

Methods:

* DFS + parent tracking
* Union Find

Problems:

1. Graph Valid Tree
2. Redundant Connection
3. Number of Connected Components in an Undirected Graph

---

## 7. Cycle Detection in Directed Graph

Methods:

* DFS recursion stack
* Topological sort
* Kahn's algorithm

Problems:

1. Course Schedule
2. Course Schedule II
3. Find Eventual Safe States
4. Alien Dictionary
5. Detect Cycles in 2D Grid

---

# Phase 5: Topological Sorting and DAG

## 8. Topological Sort

Learn:

* DAG
* Ordering dependencies
* DFS topo sort
* Kahn's algorithm

---

## 9. Kahn's Algorithm

Learn:

* Indegree
* Queue processing
* Cycle detection using indegree

Important Problems:

Easy:

1. Course Schedule
2. Course Schedule II

Medium:

3. Alien Dictionary
4. Sequence Reconstruction
5. Parallel Courses
6. Minimum Height Trees
7. Sort Items by Groups Respecting Dependencies

Hard:

8. Build a Matrix With Conditions

---

# Phase 6: Shortest Path Algorithms

## 10. BFS Shortest Path

Used for:

* Unweighted graph
* Unit weighted graph

Problems:

1. Word Ladder
2. Open the Lock
3. Shortest Path in Binary Matrix
4. Minimum Genetic Mutation
5. Snakes and Ladders

---

## 11. Dijkstra Algorithm

Learn:

* Priority queue
* Relaxation
* Greedy shortest path
* Weighted graph

Complexities:

* Heap implementation
* Adjacency list

Important Problems:

Easy:

1. Network Delay Time

Medium:

2. Path With Minimum Effort
3. Cheapest Flights Within K Stops
4. Minimum Cost to Connect Points
5. Swim in Rising Water
6. The Maze II
7. Find the City With the Smallest Number of Neighbors
8. Number of Ways to Arrive at Destination

Hard:

9. Modify Graph Edge Weights
10. Minimum Weighted Subgraph With the Required Paths

---

## 12. Bellman Ford Algorithm

Learn:

* Edge relaxation
* Negative edges
* Negative cycle detection

Problems:

1. Network Delay variations
2. Cheapest Flights Within K Stops
3. Detect Negative Cycle

---

## 13. Floyd Warshall Algorithm

Learn:

* All pairs shortest path
* Dynamic programming on graph

Problems:

1. Find the City With the Smallest Number of Neighbors
2. Course Schedule IV
3. Network connectivity variants

---

## 14. 0-1 BFS

Learn:

* Deque based shortest path
* Edge weights only 0 or 1

Problems:

1. Minimum Cost to Make at Least One Valid Path in a Grid
2. Shortest Path in Grid with Obstacles Elimination

---

# Phase 7: Union Find / Disjoint Set Union

## 15. DSU / Union Find

Learn:

* Path compression
* Union by rank
* Union by size
* Component tracking

Patterns:

* Connectivity
* Dynamic graph merging
* Cycle detection

Important Problems:

Easy:

1. Number of Connected Components in an Undirected Graph
2. Graph Valid Tree

Medium:

3. Redundant Connection
4. Accounts Merge
5. Number of Provinces
6. Satisfiability of Equality Equations
7. Most Stones Removed with Same Row or Column
8. Lexicographically Smallest Equivalent String
9. Smallest String With Swaps
10. Min Cost to Connect All Points
11. Regions Cut By Slashes

Hard:

12. Number of Islands II
13. Largest Component Size by Common Factor

---

# Phase 8: Strongly Connected Components

## 16. Tarjan Algorithm

Learn:

* Discovery time
* Low link values
* SCC
* Bridges
* Articulation points

Problems:

1. Critical Connections in a Network
2. Find Critical and Pseudo Critical Edges
3. Minimum Number of Days to Disconnect Island

---

## 17. Kosaraju Algorithm

Learn:

* SCC decomposition
* Reverse graph
* DFS ordering

Problems:

1. Strongly connected components practice problems
2. Mother Vertex
3. Eventual Safe States

---

# Phase 9: Minimum Spanning Tree

## 18. Minimum Spanning Tree Concepts

Learn:

* Spanning tree
* MST properties
* Greedy property
* Cut property
* Cycle property

---

## 19. Kruskal Algorithm

Learn:

* Sorting edges
* DSU integration

Important Problems:

1. Min Cost to Connect All Points
2. Connecting Cities With Minimum Cost
3. Optimize Water Distribution in a Village
4. Find Critical and Pseudo Critical Edges

---

## 20. Prim Algorithm

Learn:

* Priority queue MST
* Greedy edge selection

Problems:

1. Min Cost to Connect All Points
2. Minimum Spanning Tree implementations

---

# Phase 10: Bipartite Graphs

## 21. Bipartite Graph

Learn:

* Graph coloring
* Odd cycle detection
* BFS coloring
* DFS coloring

Important Problems:

Easy:

1. Is Graph Bipartite?

Medium:

2. Possible Bipartition
3. Divide Nodes Into the Maximum Number of Groups
4. Maximum Employees to Be Invited to a Meeting

Hard:

5. Cat and Mouse

---

# Phase 11: Advanced Graph Algorithms

## 22. Bridges and Articulation Points

Learn:

* Bridge edge
* Cut vertex
* Tarjan low-link technique

Problems:

1. Critical Connections in a Network
2. Minimum Number of Days to Disconnect Island

---

## 23. Eulerian Path and Circuit

Learn:

* Euler path
* Euler circuit
* Degree conditions
* Hierholzer algorithm

Problems:

1. Reconstruct Itinerary
2. Valid Arrangement of Pairs
3. Cracking the Safe

---

## 24. Hamiltonian Path

Learn:

* Backtracking
* NP-complete intuition

Problems:

1. Unique Paths III
2. Shortest Path Visiting All Nodes

---

## 25. Maximum Flow / Network Flow

Learn:

* Residual graph
* Augmenting path
* Ford Fulkerson
* Edmonds Karp
* Dinic

Problems:

1. Maximum Bipartite Matching
2. Minimum Number of Days to Disconnect Island
3. Escape Problem variants

---

# Phase 12: Tree Algorithms (Graphs Special Case)

## 26. Tree Basics

Learn:

* Diameter
* Height
* Rooted tree
* Subtree
* Parent-child relation

Problems:

1. Diameter of Binary Tree
2. Diameter of N-ary Tree
3. Tree Diameter

---

## 27. Lowest Common Ancestor (LCA)

Learn:

* Binary lifting
* Euler tour
* Sparse table

Problems:

1. Lowest Common Ancestor of a Binary Tree
2. Kth Ancestor of a Tree Node
3. Tree Queries

---

## 28. Advanced Tree Techniques

Learn:

* Rerooting DP
* Centroid decomposition
* Heavy light decomposition

Optional for interviews.

---

# Phase 13: Heaps and Priority Queue for Graphs

## 29. Heap Fundamentals

Learn:

* Min heap
* Max heap
* Heapify
* Priority queue operations

Problems:

1. Kth Largest Element
2. Top K Frequent Elements
3. Merge K Sorted Lists
4. Find Median from Data Stream
5. Task Scheduler

---

# Phase 14: Essential Patterns

## 30. Multi Source BFS

Problems:

1. Rotting Oranges
2. Walls and Gates
3. As Far from Land as Possible
4. Map of Highest Peak

---

## 31. State Graph BFS

Problems:

1. Open the Lock
2. Sliding Puzzle
3. Snakes and Ladders
4. Shortest Path Visiting All Nodes

---

## 32. Graph + DP

Problems:

1. Longest Increasing Path in a Matrix
2. Shortest Path Visiting All Nodes
3. Parallel Courses III
4. Cherry Pickup

---

# Final Revision Checklist

You should be able to:

* Build graphs from input quickly
* Choose BFS vs DFS instinctively
* Detect cycles
* Use topological sort confidently
* Solve shortest path problems
* Use DSU naturally
* Implement Dijkstra from memory
* Implement Kruskal from memory
* Identify SCC / bridges problems
* Solve grid graph problems quickly

---

# Most Important Interview Problems

If you are short on time, prioritize these:

## Must Solve

1. Number of Islands
2. Clone Graph
3. Course Schedule
4. Course Schedule II
5. Word Ladder
6. Rotting Oranges
7. Pacific Atlantic Water Flow
8. Network Delay Time
9. Cheapest Flights Within K Stops
10. Redundant Connection
11. Accounts Merge
12. Min Cost to Connect All Points
13. Critical Connections in a Network
14. Is Graph Bipartite?
15. Open the Lock
16. Shortest Path in Binary Matrix
17. Reconstruct Itinerary
18. Swim in Rising Water
19. Alien Dictionary
20. Evaluate Division

---

# Recommended Practice Platforms

* LeetCode
* Codeforces
* AtCoder
* GeeksforGeeks
* CSES Problem Set

---

# Best Strategy

For every topic:

1. Learn theory
2. Watch dry run
3. Implement from scratch
4. Solve easy problems
5. Solve medium problems
6. Revisit after 2-3 days
7. Solve without notes

---

# Suggested Timeline

## Beginner

6-8 weeks

## Intermediate

3-4 months

## Competitive level

6-12 months

---

# Final Goal

You should eventually recognize:

* Which traversal to use
* Which shortest path algorithm to use
* When DSU is better than DFS
* When topological sort applies
* Whether the graph is DAG/tree/general graph
* Whether greedy works
* Whether low-link techniques are needed

That pattern recognition is what makes someone strong at graphs.
