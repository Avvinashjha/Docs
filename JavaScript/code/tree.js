class TreeNode {
    constructor(val, left, right){
        this.val = val;
        this.left = left || null;
        this.right = right || null;
    }
}

let a = new TreeNode(1);
let b = new TreeNode (2);
let c = new TreeNode(3);
let d = new TreeNode(4);
let e = new TreeNode(5);
let f = new TreeNode(6);

// create tree
a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;
f.right = new TreeNode(7);

/**
 *       1
 *      / \
 *     2   3
 *    / \   \
 *   4   5   6
 *            \
 *             7
 */

const bt = new TreeNode(50)
const bt1 = new TreeNode(30);
const bt2 = new TreeNode(80);
const bt3 = new TreeNode(20);
const bt4 = new TreeNode(40);
const bt5 = new TreeNode(70);
const bt6 = new TreeNode(100);
const bt7 = new TreeNode(10);
const bt8 = new TreeNode(35);
const bt9 = new TreeNode(60);
const bt10 = new TreeNode(90);


bt.left = bt1;
bt.right = bt2;
bt1.left = bt3;
bt1.right = bt4;
bt2.left = bt5;
bt2.right = bt6;
bt3.left= bt7;
bt4.left = bt8;
bt5.left = bt9;
bt6.left=bt10;

/**
 *           50
 *        /.    \
 *       30     80 (bt1, bt2)
 *      /  \    /   \
 *     20. 40.  70.  100 (bt3,bt4, bt5, bt6)
 *    /    /.  /.    / 
 *   10   35. 60.   90 (bt7, bt8, bt9, bt10)
 */ 

/**
 * Binary Tree Inorder Traversal (Iterative + Recursive)
 */
function inOrder(root){
    if(root === null)return [];
    return [
        ...inOrder(root.left),
        root.val,
        ...inOrder(root.right)
    ];
}

// const res = inOrder(a);
// console.log(res);

function inOrderIterative(root){
    const result = [];
    const stack = [];
    let current = root;
    while(current !== null || stack.length > 0){
        // go to left as possible
        while(current !== null){
            stack.push(current);
            current = current.left;
        }
        // process node
        current = stack.pop();
        result.push(current.val);

        // visit the right subtree of current
        current = current.right;
    }
    return result;
}

// const res = inOrderIterative(a);
// console.log(res);



/**
 * Binary Tree Preorder
 */

function preOrder(root, result = []){
    if(root === null) return result;
    result.push(root.val);
    preOrder(root.left, result);
    preOrder(root.right, result);
    return result;
}   

// const res = preOrder(a);
// console.log(res);

function preOrderIterative(root){
    if(! root) return [];
    const result = [];
    const stack = [root];

    while(stack.length){
        const node = stack.pop();
        result.push(node.val);

        // push right and left node 
        if(node.right) stack.push(node.right);
        if(node.left) stack.push(node.left);
    }
    return result;
}

// const res = preOrderIterative(a);
// console.log(res);

/**
 *  Binary tree PostOrder Traversal
 */

function postOrder(root, result = []){
    if(!root) return result;
    postOrder(root.left, result);
    postOrder(root.right, result);
    result.push(root.val);
    return result;
}

// const res = postOrder(a);
// console.log(res);

function postOrderIterative(root){
    if(!root) return [];
    const result = [];
    const stack1 = [root];
    const stack2 = [];

    while(stack1.length){
        const node = stack1.pop();
        stack2.push(node);
        if(node.left) stack1.push(node.left);
        if(node.right) stack1.push(node.right);
    }

    while(stack2.length){
        result.push(stack2.pop().val);
    }
    return result;
}

// const res = postOrderIterative(a);
// console.log(res);

function postOrderIterativeOneStack(root){
    if(!root) return [];
    const result = [];
    const stack = [];
    let current = root;
    let lastVisited = null;

    while(current || stack.length){
        if(current){
            stack.push(current);
            current = current.left;
        }else{
            const peek = stack[stack.length-1];
            if(peek.right && lastVisited !== peek.right){
                current = peek.right;
            }else{
                result.push(peek.val);
                lastVisited = stack.pop();
            }
        }
    }
    return result;
}

// const res = postOrderIterativeOneStack(a);
// console.log(res);

/**
 * Level Order Traversal (BFS)
 */

function levelOrderTraversal(root){
    if(!root) return [];
    const queue = [root];
    const result = [];
    let i = 0;
    while(i < queue.length){
        const node = queue[i++];
        result.push(node.val);
        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);
    } 
    return result;
}

// const res = levelOrderTraversal(a);
// console.log(res);

/**
 * Return Level Wise value
 */

function levelOrderByLevel(root){
    if(!root) return [];
    const result = [];
    const queue = [root];
    while(queue.length){
        const levelSize = queue.length;
        const level = [];
        for(let i = 0; i< levelSize; i++){
            const node = queue.shift();
            level.push(node.val);
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}

// const res = levelOrderByLevel(a);
// console.log(res);


/**
 * Zigzag Level Order Traversal
 */
function zigZagLevelOrderTraversal(root){
    if(!root) return [];

    const result = [];
    const queue = [root];
    let dir = true;
    while(queue.length > 0){
        const levelLength = queue.length;
        const level = [];
        for(let i = 0; i < levelLength; i++){
            const node = queue.shift();
            level.push(node.val);
            if(node.left ) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        if(dir){
            result.push(level);
        }
        else{
            result.push(level.reverse())
        }
        dir = !dir;
    }
    return result;
}

// const res = zigZagLevelOrderTraversal(a);
// console.log(res);

/**
 * Left view of a binary tree
 */

function leftViewOfBinaryTree(root){
    if(!root) return [];
    const result = [];
    const queue = [root];

    while(queue.length > 0){
        const levelLength = queue.length;
        for(let i = 0; i < levelLength; i++){
            const node = queue.shift();
            if(i === 0){
                result.push(node.val);
            }
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
    }
    return result;
}

function leftViewOfBinaryTreeV2(root){
    const result = [];
    function dfs(node, level){
        if(!node) return;
        if(level === result.length){
            result.push(node.val);
        }
        dfs(node.left, level + 1);
        dfs(node.right, level+1);
    }
    dfs(root, 0);
    return result;
}

// const res = leftViewOfBinaryTree(a);
// console.log(res);


/**
 * Right View Of A Binary tree
 */
function rightViewOfBinaryTree(root){
    if(!root) return [];
    const result = [];
    const queue = [root];

    while(queue.length > 0){
        const levelLength = queue.length;
        for(let i = 0; i< levelLength; i++){
            const node = queue.shift();
            if(i === levelLength-1){
                result.push(node.val);
            }
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
    }
    return result;
}

// const res = rightViewOfBinaryTree(a);
// console.log(res);

function rightViewOfBinaryTreeV2(root){
    const result = [];

    function dfs(node, level){
        if(!node) return;
        if(level === result.length){
            result.push(node.val);
        }
        dfs(node.right, level+1);
        dfs(node.left, level +1);
    }
}

/**
 * Top view 
 */

function topViewBinaryTree(root){
    if(!root)return [];

    const map = new Map(); // hd -> node.val
    const queue = [{node: root, hd: 0}];
    let minHd = 0;
    let maxHd = 0;
    let idx = 0;

    while(idx < queue.length){
        const {node, hd} = queue[idx++];
        if(!map.has(hd)){
            map.set(hd, node.val);
            minHd = Math.min(minHd, hd);
            maxHd = Math.max(maxHd, hd);
        }
        if(node.left) queue.push({node: node.left, hd: hd -1});
        if(node.right) queue.push({node: node.right, hd: hd + 1});
    }

    const result = [];
    for(let i = minHd; i <= maxHd; i++){
        result.push(map.get(i));
    }
    return result;
}
// const res = topViewBinaryTree(a);
// console.log(res);

/**
 * Bottom View
 */

function bottomViewBinaryTree(root){
    if(!root) return [];
    const queue = [{node: root, hd: 0}];
    let minHd = 0;
    let maxHd = 0;
    let idx = 0;
    const map = new Map();
    while(idx < queue.length ){
        const {node, hd} = queue[idx++];
        map.set(hd, node.val);
        minHd = Math.min(minHd, hd);
        maxHd = Math.max(maxHd, hd);
        if(node.left) queue.push({node: node.left, hd: hd -1});
        if(node.right) queue.push({node: node.right, hd: hd+1});
    }

    const result = [];
    for(let i = minHd; i <= maxHd; i++){
        result.push(map.get(i));
    }
    return result;
}

// const res = bottomViewBinaryTree(a);
// console.log(res);

/**
 * Maximum Depth of Binary Tree
 */
function maxDepthOfBinaryTree(root){
    if(!root) return 0;
    const queue = [root];
    let depth = 0;
    let idx = 0;
    while(idx < queue.length){
        // for each level we need to increase the depth
        depth++;
        // on each level we will do this
        const levelSize = queue.length - idx;
        for(let i = 0; i < levelSize; i++){
            const node = queue[idx++];
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
    }
    return depth;
}

function maxDepthOfBinaryTreeV2(root){
    if(!root) return 0;
    return 1 + Math.max(maxDepthOfBinaryTreeV2(root.left), maxDepthOfBinaryTreeV2(root.right));
}

// const res = maxDepthOfBinaryTree(a);
// console.log(res);
/**
 * Height of a Binary tree
 */

function heightOfBinaryTree(root){
    if(!root) return 0;

    const left = heightOfBinaryTree(root.left);
    const right = heightOfBinaryTree(root.right);
    return 1 + Math.max(left, right);
}

// console.log(heightOfBinaryTree(a));

/**
 * Diameter of Binary Tree
 */

function diameterOfABinaryTree(root){
    if(!root)return 0;
    let diameter = 0;
    function height(node){
        if(!node) return 0;
        let left = height(node.left);
        let right = height(node.right);
        diameter = Math.max(diameter, left + right);
        return 1 + Math.max(left, right);
    }
    height(root);
    return diameter;
}

// console.log(diameterOfABinaryTree(a));


/**
 * Balanced Binary Tree (height-balanced check)
*/
function isBinaryTreeBalanced(root){
    if(!root) return true;
    let isBalanced = true;
    function height(node){
        if(!node) return 0;
        let left = height(node.left);
        let right = height(node.right);
        if(Math.abs(left - right) > 1) {
            isBalanced = false;
        };
        return 1 + Math.max(left, right);
    }
    height(root)
    return isBalanced;
}

// console.log(isBinaryTreeBalanced(a));// false
// console.log(isBinaryTreeBalanced(b)); //true


/**
 * Invert Binary Tree (mirror )
 */
function invertBinaryTree(root){
    if(!root) return null;

    invertBinaryTree(root.left);
    invertBinaryTree(root.right);
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
    return root;
}

// const res = levelOrderByLevel(invertBinaryTree(a));
// console.log(res);



/**
 * LCA of Binary Tree
 */
function lowestCommonAncestor(root, a, b){
    if(!root) return null;
    if(root === a || root === b){
        return root;
    }
    const left = lowestCommonAncestor(root.left, a,b);
    const right = lowestCommonAncestor(root.right, a, b);
    if(left !== null && right !== null){
        return root;
    }
    return left !== null ? left : right;
}

// const res = lowestCommonAncestor(a, b,c);
// console.log(res.val);

/**
 * LCA of BST
 */
function lcaBst(root, a, b){
    if(!root) return null;
    if(a.val < root.val && b.val < root.val){
        return lcaBst(root.left, a, b);
    }
    if(a.val > root.val && b.val > root.val){
        return lcaBst(root.right, a, b);
    }
    return root;
}

function lacBstIterative(root, a, b){
    let current = root;
    while(current){
        if(current.val > a.val && current.val > b.val){
            current = current.left;
        }else if(current.val < a.val && current.val < b.val){
            current = current.right;
        }else{
            return current;
        }
    }
    return null;
}

// console.log(lacBstIterative(bt, bt3, bt4)?.val);

/**
 * Validate Binary Search Tree
 */

function validateBST(root, min = -Infinity, max = Infinity){
    if(!root) return true;
    if(root.val <= min || root.val >= max) return false;
    return validateBST(root.left, min, root.val)&& validateBST(root.right, root.val, max);
}
// bt3.left = new TreeNode(1000)
// const isValidBST = validateBST(bt);
// console.log(isValidBST);

/**
 * Kth Smallest Element in BST
 */
function kthSmallestInBST(root , k){
    if(!root) return null;
    const stack = [];
    let current = root;
    let count = 0;
    while(current !== null || stack.length > 0){
        // go to as left as possible
        while(current){
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        count++;
        if(count === k){
            return current.val;
        }
        // visit right subtree of current
        current = current.right;
    }
    return -1;
}

// const res = kthSmallestInBST(bt, 5);
// console.log(res);

/**
 * Convert Sorted Array to BST
 */
function sortedArrayToBST( arr){
    if(arr.length === 0) return null;
    const mid= Math.floor(arr.length /2);
    const root = new TreeNode(arr[mid]);
    root.left = sortedArrayToBST( arr.slice(0, mid));
    root.right = sortedArrayToBST(arr.slice(mid+1, arr.length-1));
    return root;
}

// const bst = sortedArrayToBST([1,2,3,4,5,6,7]);
// console.log(levelOrderByLevel(bst));

/**
 * Inorder Successor in BST
 */

/**
 * Construct Binary Tree from Preorder + Inorder
 */

/**
 * Construct Binary Tree from Inorder + Postorder
 */

/**
 * Serialize and Deserialize Binary Tree
 */

/**
 * Path Sum II (all root-to-leaf paths with target sum)
 */

function allPathWithTargetSum(root, targetSum) {
    if (!root) return [];

    const res = [];
    const stack = [[root, targetSum, []]];

    while (stack.length > 0) {
        const [node, sum, path] = stack.pop();
        const newPath = [...path, node.val];

        if (!node.left && !node.right && sum === node.val) {
            res.push(newPath);
        }

        if (node.right) {
            stack.push([node.right, sum - node.val, newPath]);
        }

        if (node.left) {
            stack.push([node.left, sum - node.val, newPath]);
        }
    }

    return res;
};


/**
 * Binary Tree Maximum Path Sum
 */

/**
 * Flatten Binary Tree to Linked List
 */
