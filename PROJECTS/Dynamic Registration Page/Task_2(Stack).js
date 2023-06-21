// Complete the function pushIntoStack and popFromStack to complete the Stack class.




// LOGIC - 1
class Stack {
    constructor(stack) {
        this.stack = stack
        this.count += 1
    }

    // pushIntoStack function - It takes the value and pushes it into the stack ( This function doesn't return anything )
    pushIntoStack(value) {
        this.stack.push(value)
    }

    //  popFromStack function - It returns the last element of the stack  ( if no element present in stack , it should return -1 )
    popFromStack() {
        if (this.stack.length == 0) {
            return -1
        } else {
            return this.stack.pop()
        }
    }

    printElements() {
        for (let element of this.stack) {
            console.log(element);
        }
    }
}

let myStack = new Stack([])
myStack.pushIntoStack('a')
myStack.pushIntoStack('b')
myStack.pushIntoStack('c')
myStack.pushIntoStack('d')
myStack.pushIntoStack('e')
// myStack.printElements()
// console.log("Popped Element : ", myStack.popFromStack())


// LOGIC - 2
class Stack_2 {
    static count = 0
    constructor(stack) {
        this.stack = stack
    }

    // pushIntoStack function - It takes the value and pushes it into the stack ( This function doesn't return anything )
    pushIntoStack(value) {
        this.stack[Stack_2.count] = value
        Stack_2.count++;
    }

    //  popFromStack function - It returns the last element of the stack  ( if no element present in stack , it should return -1 )
    popFromStack() {
        if (Stack_2.count == 0) {
            return -1
        } else {
            return this.stack[--Stack_2.count]
        }
    }

    printElements() {
        console.log('No of elements :', Stack_2.count);
        for (let element of this.stack) {
            console.log(element);
        }
    }
}

let myStack_2 = new Stack_2([])
myStack_2.pushIntoStack('a')
myStack_2.pushIntoStack('b')
myStack_2.pushIntoStack('c')
myStack_2.pushIntoStack('d')
myStack_2.pushIntoStack('e')
myStack_2.printElements()
console.log('Popped Element :', myStack_2.popFromStack());
console.log('Popped Element :', myStack_2.popFromStack());
console.log('Popped Element :', myStack_2.popFromStack());
console.log('Popped Element :', myStack_2.popFromStack());
