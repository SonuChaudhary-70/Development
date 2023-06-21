// Before promise
// lets take ex of flipkart
const cart = ['Phone', 'Shoes', 'Clothes']

// create an api createOrder api to create order which will accept cart and callback function to process further
createOrder(cart, function (orderId) {
    // now we can call another callback function for payment processing
    proceedToPayment(orderId, function () {
        // after successful payment we will print order summary
        orderSummary(orderId, function () {
            // after orderSummary we will update our wallet
            updateWallet(orderSummary, function () {
                console.log('You recently purchase some items now your wallet balance : balance');
            })
        })
    })
})

// after promise
const promise = createOrder(cart)

promise.then(function (orderId) {  // this function is callback function which is attach to createOrder function to work asynchronously
    printOrderSummary(orderId)
})


// // create new promise
// let promise = new Promise((res, rej) => {
//     res('I am resolved')
// })

// promise.then((result) => {
//     console.log(result)
// })