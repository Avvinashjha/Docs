# Tree 

A tree is a data structure where we store data in a tree format. Most of the time tree is generally binary in nature where each node will have only two child node.

Root: 
Node:
Leaf Node:
Parent:
Ancestor:

## Implement a Binary tree

## Implement a Binary search tree

## Tree Traversal Algorithms

## Tree Searching Algorithm

## AVL Tree

A AVL tree is a type of self balancing Binary Search Tree. It keeps itself balanced after every insertion and deletion so the operation stay efficient.

The key idea:
> For every node, the difference between the height of it's left and right subtree is at most 1.

This difference is called **Balance Factor**:

```
Balance Factor = Height(left) - Height(right)
```

allowed values: **-1, 0, +1**

### Why do we need AVL Trees?

A normal BST can become skewed:

```
1
 \
  2
   \
    3
     \
      4
```
This becomes O(n) for search.

AVL Tree ensures:
- Height stays O(log n)
- All operations state O(log n)

### How AVL Maintains Balance?

When imbalance happens, it uses rotations:

#### 1. Right Rotation (LL Case)

Insert: `30 -> 20 -> 10`

```
    30
   /
 20
 /
10
```

- Balance at 30 = +2 (unbalanced)
- Pattern Left of Left -> LL case

Right Rotation on 30

We rotate around 30

Before:

```
   30 (y)
  /
20 (x)
/
10
```

Identify parts:

- y = 30
- x = 20
- T2 = x.right -> null (here)

Step By Step Transformation

1. Move x up
   
   ```
      20
     /
    10
   ```
2. Make old root (30) right child of 20
   
   ```
       20
      /  \
     10   30
   ```
3. Attach T2
   
   - Here T2 is null so nothing changes.

Final Tree

```
   20
  /  \
10   30
```

#### 2. Left Rotation (RR Case)

Insert: 10 -> 20 -> 30

```
10
 \
  20
   \
   30
```

- Balance at 10 = -2 (unbalanced)
- Pattern: Right of Right -> RR case

Before:

```
10 (x)
  \
   20 (y)
     \
      30
```

Identify:

- x = 10
- y = 20
- T2 = y.left -> null

Step By Step

1. Move y up
   
   ```
    20
     \
     30
   ```
2. Make 10 left child of 20
   
   ```
       20
      /  \
    10   30
   ```
3. Attach T2
   - T2 = null -> no change

Final Tree

```
   20
  /  \
10   30
```

#### 3. Left-Right Rotation (LR Case)

Insert: `30 -> 10 -> 20`

```
   30
  /
10
  \
   20
```

- Balance at 30 = +2 (unbalanced)
- Pattern: Left -> Right -> LR case

Step 1: Left Rotation on 10

Before:

```
10
  \
   20
```

After:

```
  20
 /
10
```

Tree Becomes:

```
     30
    /
   20
  /
 10
```

Step 2: Right Rotation on 30

Before:

```
   30
  /
 20
/
10
```

After:

```
   20
  /  \
10   30
```

Final Tree:

```
   20
  /  \
10   30
```


#### 4. Right-Left Rotation (RL Case)

Insert: `10 -> 30 -> 20`

```
10
  \
   30
  /
 20
```
- Balance at 10 = -2 (unbalance)
- Pattern: Right -> Left -> RL case

Step 1: Right Rotation on 30

Before: 

```
   30
  /
 20
```

After:

```
   20
     \
      30
```

Tree Becomes:
```
10
  \
   20
     \
      30
```

Step 2: Left Rotation
### Time Complexity

|Operation|Time Complexity|
|---------|---------------|
|Search | O(log n)|
|Insert | O(log n)|
|Delete | O(log n)|

### Use Cases of AVL Trees

AVL Tree are used when read/search operations are frequent and need to be very fast.

1. In-Memory databases/ indexing
   - When data changes but still needs fast backup
   - Example: Ordered key-value store

2. Autocomplete / Dictionary system
   - Words stored in sorted order
   - Fast prefix lookup(through tries are often preferred) 

3. Scheduling system
   - Maintain sorted events (by time)
   - Frequent insert / search

4. Networking and Routing table
   - Fast lookup and update
  
5. Range Queries
   - Finding values in a range efficiently





## B Tree

## B+ Tree

## Black and White Tree

