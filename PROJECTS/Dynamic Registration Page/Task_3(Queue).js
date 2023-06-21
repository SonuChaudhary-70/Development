// LOGIC - 1
class Queue {
    constructor(queue) {
        this.queue = queue
        this.minPos = 0;
        this.maxPos = queue.length - 1
    }

    pushIntoQueue(value) {
        this.queue.push(value)
    }

    popFromQueue() {
        // Complete this function
        //return the elements based on FIFO logic
        //When no elements remain to return , return -1
        // while(this.minPos < this.maxPos){
        //     let temp = this.queue[this.minPos]
        //     this.queue[this.minPos] = this.queue[this.maxPos]
        //     this.queue[this.maxPos] = temp;
        //     this.minPos++
        //     this.maxPos--
        // }
        if (this.queue.length == 0) {
            return -1
        } else {
            return this.queue.shift()
        }
    }

    printElements() {
        // console.log(`No if Elements : ${Quefue.count}`);
        for (let element of this.queue) {
            console.log(element);
        }
    }
}

const myQueue = new Queue([])
myQueue.pushIntoQueue('a')
myQueue.pushIntoQueue('b')
myQueue.pushIntoQueue('c')
myQueue.pushIntoQueue('d')
myQueue.pushIntoQueue('e')


// LOGIC - 2
class Queue_2 {
    constructor(queue) {
        this.queue = queue
        this.minPos = 0;
        this.maxPos = queue.length - 1
    }

    pushIntoQueue(value) {
        this.maxPos++
        this.queue[this.maxPos] = value
    }

    popFromQueue() {
        let dequeue = []
        let len = this.queue.length
        while (dequeue.length < this.queue.length) {
            dequeue.push(this.queue[--len])
        }
        console.log('dequeue :', dequeue);
        if (this.maxPos <= 0) {
            return -1
        } else {
            return dequeue[this.maxPos--]
        }
    }

    printElements() {
        console.log(`No if Elements : ${this.maxPos}`);
        for (let element of this.queue) {
            console.log(element);
        }
    }
}

const myQueue_2 = new Queue_2([])
myQueue_2.pushIntoQueue('a')
myQueue_2.pushIntoQueue('b')
myQueue_2.pushIntoQueue('c')
myQueue_2.pushIntoQueue('d')
myQueue_2.pushIntoQueue('e')
myQueue_2.printElements()
console.log('Popped Element :', myQueue_2.popFromQueue());
console.log('Popped Element :', myQueue_2.popFromQueue());
console.log('Popped Element :', myQueue_2.popFromQueue());
console.log('Popped Element :', myQueue_2.popFromQueue());
console.log('Popped Element :', myQueue_2.popFromQueue());
console.log('Popped Element :', myQueue_2.popFromQueue());
