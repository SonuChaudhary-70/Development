
// LOGIC - 1
let remove3rdlastElem = function (head) {

    // Write your code here to remove the 3 rd last element from link list
    if (head == null || head.next.next == null) {
        return head
    }
    let temp = head
    while (temp.next.next.next.next != null) {
        temp = temp.next
    }
    temp.next = temp.next.next

};

LOGIC - 2

// var remove3rdlastElem = function(head) {
    
//     // Write your code here to remove the 3 rd last element from link list
//     if(head.next.next == null) return head
//     let count = 0
//     let temp = head
//     while(temp != null){
//         count++
//         temp = temp.next
//     }
//     temp = head
//     for(let i=0; i<count-4; i++){
//         temp = temp.next
//     }
//     // console.log(temp)
//     temp.next = temp.next.next
// };


// var remove3rdlastElem = function(head) {
    
//     // Write your code here to remove the 3 rd last element from link list
//     let curr = head;
//     if(curr == null || curr.next.next == null) {
//         return head
//     }
//     let temp = head
//     while(temp.next.next.next.next != null){
//         temp = temp.next
//     }
//     temp.next = temp.next.next
//     //Dont change anything below. If changed click on reset.
//     printLinkList(head)
// };


// let length = 0;
//     let curr = head;
//     while(curr !== null){
//         length++;
//         curr = curr.next;
//     }
//     if(length==1 && n==1) return null;
//     if(length==3) return head.next;
//     let newN = length + 1 - 3; // we can move forword only.
    
//     curr = head;

//     while(newN - 2 !== 0 && curr !== null){
//         curr = curr.next;
//         newN--;
//     }
//     if(curr !== null) curr.next = curr.next.next;