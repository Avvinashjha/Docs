class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1; // important for AVL
    }
}

class AVLTree {
    constructor(){
        this.root = null;
    }

    // get height
    height(node){
        return node ? node.height : 0;
    }

    // get balance factor
    getBalance(node){
        return node ? this.height(node.left) - this.height(node.right) : 0;
    }

    // Right Rotation (LL Case)
    rightRotate(y){
        let x = y.left;
        let T2 = x.right;

        // rotation
        x.right = y;
        y.left = T2;

        // update heights
        y.height = 1 + Math.max(this.height(y.left), this.height(y.right));
        x.height = 1 + Math.max(this.height(x.left), this.height(x.right));
        return x;
    }

    // Left Rotation (RR Case)
    leftRotate(x){
        let y = x.right;
        let T2 = y.left;

        // rotation
        y.left = x;
        x.right = T2;

        // update heights
        x.height = 1 + Math.max(this.height(x.left), this.height(x.right));
        y.height = 1 + Math.max(this.height(y.left), this.height(y.right));
        return y;
    }

    insertNode(node, value){
        // 1. Normal BST Insert
        if(!node) return new Node(value);

        if(value < node.value){
            node.left = this.insertNode(node.left, value);
        }else if(value > node.value){
            node.right = this.insertNode(node.right, value);
        }else{
            return node; // no duplicates
        }

        // 2. Update height
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));

        // 3. get Balance
        let balance = this.getBalance(node);

        // 4. handle 4 cases

        // LL case
        if(balance > 1 && value > node.left.value){
            return this.rightRotate(node);
        }

        // RR Case
        if(balance > 1 && value > node.right.value){
            return this.leftRotate(node);
        }

        // LR Case
        if(balance < -1 && value < node.left.value){
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        // RL case
        if(balance < -1 && value < node.right.value){
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
        return node;
    }

    insert(value){
        this.root = this.insertNode(this.root, value);
    }
}

