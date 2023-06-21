// Given the head of a singly linked list, return the middle node of the linked list.

// If there are two middle nodes, return the second middle node.

let middleNode = function (head) {
    let temp = head
    let count = 0
    let mid = 0
    while (temp != null) {
        count++
        mid = Math.floor(count / 2)
        temp = temp.next
    }
    temp = head
    for (let i = 0; i < mid; i++) {
        temp = temp.next
    }
    return temp
};