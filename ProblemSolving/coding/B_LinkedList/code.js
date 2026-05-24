class LNode {
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

// 1. Reverse a Linked List

function reverseLinkedList(head){
    if(!head) return head;

    let prev = null;
    let curr = head;
    let next = null;

    while(curr != null){
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

// 4->5->6->7
const n1 = new LNode(4);
n1.next = new LNode(5);
n1.next.next = new LNode(6);
n1.next.next.next = new LNode(7);

// console.log(n1);

// const n2 = reverseLinkedList(n1);
// console.log(n2);

// 2. Find middle of Linked List
/**
 * So we can user 2 pointer 1 slow pointer which will move 1 step at a time
 * and second pointer will move two step at a time
 * when fast pointer reaches the end slow pointer will be in middle
 */
function findMiddleOfTheList(head){
    let fast = head;
    let slow = head;
    while(fast && fast.next ){
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow.data;
}

//3. Detect Cycle in liked-list

function detectCycle(head){
    let fast = head;
    let slow = head;

    while(fast && fast.next){
        fast = fast.next.next;
        slow = slow.next;
        if(fast === slow){
            return true;
        }
    }
    return false;
}

// console.log(detectCycle(n1));

// // 1 -> 2-> 3 -> 5 -> 4 -> 3

const l2 = new LNode(1);
l2.next = new LNode(2);
l2.next.next = new LNode(3);
l2.next.next.next = new LNode(5);
l2.next.next.next.next = new LNode(4);
l2.next.next.next.next.next = l2.next.next;

// 4. Length of a linked list

function lengthOfList(head){
    let curr = head;
    let count = 0;
    while(curr){
        count++;
        curr = curr.next;
    }
    return count;
}

// 5. Remove duplicate from sorted list
function removeDuplicatesFromSortedList(head){
    if(!head) return head;

    let curr = head;
    let prev = null;
    while(curr){
        prev = curr;
        curr = curr.next;
        while(curr && prev.data === curr.data){
            curr = curr.next;
        }
        prev.next = curr;
    }
    return head;
}

const l3 = new LNode(1);
l3.next = new LNode(1);
l3.next.next = new LNode(2);
l3.next.next.next = new LNode(2);
l3.next.next.next.next = new LNode(3);

// console.log(removeDuplicatesFromSortedList(l3));

// 6. Merge two sorted linked list

var mergeTwoLists = function(list1, list2) {
    const list = new ListNode(0);

    let temp = list;
    while(list1 !== null && list2 !== null){
        if(list1.val < list2.val){
            temp.next = new ListNode(list1.val);
            list1 = list1.next;
        }else{
            temp.next = new ListNode(list2.val);
            list2 = list2.next;
        }
        temp = temp.next;
    }

    while(list1 !== null){
        temp.next = new ListNode(list1.val);
        list1 = list1.next;
        temp = temp.next;
    }

    while(list2 !== null){
        temp.next = new ListNode(list2.val);
        list2 = list2.next;
        temp = temp.next;
    }
    return list.next;
};






// 7. Remove Nth node from end

// 8. Check if Linked list is palindrome

// 9. Intersection of two linked list

// 10. Add two number

// 11. Reverse a Linked list II (Reverse a sublist from position m to n.)

// 12. Swap Nodes in pair

// 13. Rotate Liked List

// 14. Reorder List (Transform: L0 → Ln → L1 → Ln-1 → ...)

// 15. Partition list (Rearrange node around a value x )

// 16. LRU cache implementation

// 17. Flatten Multilevel doubly linked list

// 18. Copy List with random pointer

// 19. Merge K sorted linked list

// 20. Reverse nodes in k group








