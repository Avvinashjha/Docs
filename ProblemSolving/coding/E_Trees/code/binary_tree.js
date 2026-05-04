class TreeNode{
    constructor(data){
        this.data = data;
        this.right = null;
        this.left = null;
    }
}

const root = new TreeNode(10);
root.left = new TreeNode(20);
root.right = new TreeNode(3);
root.left.left = new TreeNode(40);
root.left.right = new TreeNode(50);
root.right.left = new TreeNode(60);
root.right.right = new TreeNode(70);

function inorder(root, res = []){
   if(!root) return [];
   inorder(root.left, res);
   res.push(root.data);
   inorder(root.right, res);
   return res;
}

function preorder(root){
    if(!root) return;
    console.log(root.data);
    preorder(root.left);
    preorder(root.right);
}

function postOrder(root){
    if(!root) return;
    postOrder(root.left);
    postOrder(root.right);
    console.log(root.data);
}

function bfs(root){
    if(!root) return;
    const queue = [root];
    let front = 0;
    console.log("BFS");
    
    while(queue.length > front){
        const currentNode = queue[front++];
        console.log(currentNode.data);
        if(currentNode.left !== null) queue.push(currentNode.left);
        if(currentNode.right !== null) queue.push(currentNode.right);
    }
}

function leftViewOfBinaryTree(root){
    if(!root) return;
    const queue = [{node: root, level: 0}];
    const map = new Map();
    let front = 0;
    while(queue.length > front){
        
    }
}

function rightViewOfBinaryTree(){

}

function topViewOfBinaryTree(){

}

function bottomViewOfBinaryTree(){

}

function diameterOfBinaryTree(){

}

function lowestCommonAncestor(){

}

function kthCommonAncestor(){

}

function checkBalanceBinaryTree(){

}

function checkPerfectBinaryTree(){

}

function checkFullBinaryTree(){

}

function checkCompleterBinaryTree(){

}

function balanceBinaryTree(){

}

function lowestCommonAncestor(){

}

function maximumDifferenceBetweenNodeAndAncestor(){}

function checkIdenticalTree(){

}

function largestSubtreeSum(){}

function cloneBinaryTree(){}