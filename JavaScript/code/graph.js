/**
 * Undirected graph
 */

class UGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdges(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  removeEdge(v1, v2) {
    this.adjacencyList[v1].filter((v) => v !== v2);
    this.adjacencyList[v2].filter((v) => v !== v1);
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }
}

// Create a undirected graph
const u_graph = new UGraph();

u_graph.addVertex(1);
u_graph.addVertex(2);
u_graph.addVertex(3);
u_graph.addVertex(4);
u_graph.addVertex(5);
u_graph.addVertex(6);
u_graph.addVertex(7);
u_graph.addVertex(8);
u_graph.addVertex(9);
u_graph.addVertex(10);

u_graph.addEdges(1, 2);
u_graph.addEdges(1, 3);
u_graph.addEdges(2, 10);
u_graph.addEdges(2, 4);
u_graph.addEdges(3, 4);
u_graph.addEdges(3, 5);
u_graph.addEdges(4, 8);
u_graph.addEdges(4, 7);
u_graph.addEdges(5, 6);
u_graph.addEdges(6, 7);
u_graph.addEdges(7, 9);
u_graph.addEdges(8, 10);
u_graph.addEdges(8, 9);

const adjList = u_graph.adjacencyList;


// dfs
function dfsIterative(adjList, start) {
  const result = [];
  const stack = [start];
  const visited = new Set([start]);

  while (stack.length > 0) {
    const current = stack.pop();
    result.push(current);
    for (let neighbor of adjList[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        stack.push(neighbor);
      }
    }
  }
  return result;
}

function dfsRecursive(adjList, start) {
  const result = [];
  const visited = new Set();

  function dfs(node) {
    if (visited.has(node)) return;
    visited.add(node);
    result.push(node);
    for (let neighbor of adjList[node]) {
      dfs(neighbor);
    }
  }
  dfs(start);
  return result;
}

// const res = dfsRecursive(adjList, 2);
// console.log(res);

/**
 *{
  '1': [ 2, 3 ],
  '2': [ 1, 10, 4 ],
  '3': [ 1, 4, 5 ],
  '4': [ 2, 3, 8, 7 ],
  '5': [ 3, 6 ],
  '6': [ 5, 7 ],
  '7': [ 4, 6, 9 ],
  '8': [ 4, 10, 9 ],
  '9': [ 7, 8 ],
  '10': [ 2, 8 ]
}
 */

function bfsIterative(adjList, start){
    const result = [];
    const visited = new Set([start]);
    const queue = [start];
    while(queue.length > 0){
        const current = queue.shift();
        result.push(current);
        
        for(let l of adjList[current]){
            if(!visited.has(l)){
                visited.add(l);
                queue.push(l);
            }
        }
    }
    return result;
}
console.log(adjList);

const res = bfsIterative(adjList, 1);
console.log(res);



/**
 * Find town Judge
 */

function findTownJudge(n, trust) {
  function getAdjList(trust, n) {
    let list = {};
    // add node
    for (let i = 1; i <= n; i++) {
      list[i] = [];
    }

    // add edges
    for (let [from, to] of trust) {
      list[from].push(to);
    }
    return list;
  }
  let graph = getAdjList(trust, n);

  // Validation 1: can must not have contact with any other
  let candidate = -1;
  for (let i = 1; i <= n; i++) {
    if (graph[i].length === 0) {
      candidate = i;
    }
  }

  if (candidate === -1) return -1;

  // check if everyone else is connected to candidate
  for (let i = 1; i <= n; i++) {
    if (!graph[i].includes(candidate)) {
      return -1;
    }
  }
  return candidate;
}

/**
 * Find center star
 */
function generateAdjList(edges) {
  const list = {};
  // get vertices
  const set = new Set();
  for (let edge of edges) {
    set.add(edge[0]);
    set.add(edge[1]);
  }

  // add vertices to adjecency list
  set.forEach((key) => {
    list[key] = [];
  });

  // add edges
  for (let [from, to] of edges) {
    list[from].push(to);
    list[to].push(from);
  }
  return { list, nodes: [...set] };
}
var findCenter = function (edges) {
  const { list, nodes } = generateAdjList(edges);
  let candidate = -1;
  for (let node of nodes) {
    if (list[node].length === nodes.length - 1) {
      candidate = node;
      break;
    }
  }

  // check if there if any candidate
  if (candidate === -1) {
    return -1;
  }

  // verify if candidate is connected to all other nodes
  for (let node of nodes) {
    if (node === candidate) continue;
    if (!list[candidate].includes(node)) {
      return -1;
    }
  }

  return candidate;
};

// console.log(findCenter([[1,2],[5,1],[1,3],[1,4]]));

/**
 * Number of Connected Components in an Undirected Graph
 * A connected component is a maximal set of nodes where:
 * - Any node can reach any other node using the graph’s edges
 * - You cannot add another node to the set without breaking connectivity
 */

/**
 * n = 5
 * edges = [[0,1],[1,2],[3,4]]
 * list = {
 * 0: [1],
 * 1: [0, 2],
 * 2: [1],
 * 3: [4],
 * 4: [3]
 * }
 */
function noOfConnectedComponent(n, edges) {
  function generateAdjList(n, edges) {
    const list = {};
    for (let i = 0; i < n; i++) {
      list[i] = [];
    }

    // populate the connection
    for (let [from, to] of edges) {
      list[from].push(to);
      list[to].push(from);
    }
    return list;
  }
  const list = generateAdjList(n, edges);
  const visited = new Set();
  const result = [];
  for (let i = 0; i < n; i++) {
    let temp = [];
    if (!visited.has(i)) {
      // new connected component found
      const stack = [i];
      visited.add(i);

      while (stack.length > 0) {
        const current = stack.pop();
        temp.push(current);
        for (let neighbor of list[current]) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            stack.push(neighbor);
          }
        }
      }
      result.push(temp);
    }
  }
  return result;
}

// const res = noOfConnectedComponent(5, [
//   [0, 1],
//   [1, 2],
//   [3, 4],
// ]);
// console.log(res);

/**
 * Clone Graph
 */

/**
 * Detect Cycle in Undirected Graph
 */

/**
 * Detect Cycle in Directed Graph
 */

/**
 * Number of Islands (grid BFS/DFS)
 */

/**
 * Max Area of Island
 */

/**
 * Surrounded Regions (Replace O’s)
 */

/**
 * Shortest Path in Binary Matrix
 */

/**
 * Network Delay Time (Dijkstra)
 */

/**
 * Cheapest Flights Within K Stops (Modified BFS/Dijkstra/Bellman-Ford)
 */

/**
 * Path With Minimum Effort (Binary search + BFS OR Dijkstra)
 */

/**
 * Course Schedule I (detect if possible → cycle check)
 */

/**
 * Course Schedule II (return valid order → topo sort)
 */

/**
 * Alien Dictionary (graph build + topo order)
 */

/**
 * Number of Provinces
 */

/**
 * Redundant Connection (detect extra edge in tree)
 */

/**
 * Accounts Merge
 */

/**
 * Word Ladder
 */

/**
 * Word Search (2D Grid)
 */

/**
 * Evaluate Division (graph with weighted edges)
 */
