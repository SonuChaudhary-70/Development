let findSumOfOddElements = function (head) {

    // return the sum of odd values of the linkedlist
    let temp = head
    let sum = 0
    while (temp != null) {
        if (temp.val % 2 != 0) sum = sum + temp.val
        temp = temp.next
    }
    return sum
};