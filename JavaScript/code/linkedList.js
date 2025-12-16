class ListNode {
  constructor(value, right, left) {
    this.value = value;
    this.right = right || null;
    this.left = left || null;
  }
}

const head = new ListNode(10);

console.log(head);

function addLeftNode(head, value) {
  if (head === null) {
    console.log("Head is null");
    return;
  }

  let temp = head;
  while (temp.left !== null) {
    temp = temp.left;
  }
  temp.left = new ListNode(value);
}

function printLeftChain(head){
    if(head === null){
        console.log("[] -> null"  );
        return;
    }
    let str = "";
    let temp = head;
    while(temp != null){
        str += `[${temp.value}] -> `;
        temp = temp.left;
    }
    str += "null"
    console.log(str);
}

function size(head){
    if(head === null) return 0;
    let count = 0;
    let temp = head;
    while(temp !== null){
        count++;
        temp = temp.left;
    }
    return count;
}

function sortList(head){
    if(head === null || head.left === null) return head;

    
}

function mergeTwoList(head1, head2){

}



addLeftNode(head, 20);
addLeftNode(head, 30);
addLeftNode(head, 40);

console.log(size(head));

printLeftChain(head)

/**
 * Reverse a Linked List (Iterative & Recursive)
 */

/**
 * Reverse Linked List II (reverse between left and right)
 */

/**
 * Rotate Linked List (left/right)
 */

/**
 * Reverse Nodes in k-Group
 */

/**
 * Middle of the Linked List
 */

/**
 * Remove N-th Node From End of List
 */

/**
 * Merge Two Sorted Lists
 */

/**
 * Merge K Sorted Lists (min-heap / divide & conquer)
 */

/**
 * Intersection of Two Linked Lists
 */

/**
 * Linked List Cycle Detection (Floyd’s algorithm)
 */

/**
 * Linked List Cycle II (find start of cycle)
 */

/**
 * Sort List (merge sort on linked list)
 */

/**
 * Reorder List (L1 → Ln → L2 → Ln-1 …)
 */

/**
 * Remove Duplicates from Sorted List
 */

/**
 * Remove Duplicates from Sorted List II (remove all duplicates)
 */

/**
 * Copy List with Random Pointer (hash map + O(1) trick)
 */

/**
 * Add Two Numbers
 */

/**
 * Add Two Numbers II (with forward order digits)
 */

/**
 * Design LRU Cache (LinkedHashMap or LL + HashMap)
 */

/**
 * Design a Linked List (LeetCode Design Linked List)
 */
