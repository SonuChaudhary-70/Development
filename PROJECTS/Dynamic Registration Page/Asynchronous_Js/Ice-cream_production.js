// ICE-CREAM PRODUCTION USING PROMISES

let stocks = {
    Fruits: ["strawberry", "grapes", "banana", "apple"],
    liquid: ["water", "ice"],
    holder: ["cone", "cup", "stick"],
    toppings: ["chocolate", "peanuts"],
};

let orderPromise = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve()   // this is callback function (productions) which were called when the promise is resolved
    }, 2000);
})

let is_shop_open = false

let order = (work, time) => {
    return new Promise((resolve, reject) => {
        if (is_shop_open) {
            setTimeout(() => {
                resolve(work())
            }, time)
        } else {
            reject(console.log('Sorry shop is closed '))
        }
    })
}

order(() => console.log(`${stocks.Fruits[0]} Was selected`), 2000)
    .then(() => {
        return order(() => { console.log('Order received. Production has started ') }, 0)
    })

    .then(() => {
        return order(() => { console.log(`Fruits has been chopped`) }, 2000)
    })

    .then(() => {
        return order(() => { console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} was added`) }, 1000)
    })

    .then(() => {
        return order(() => { console.log(`Machine has been started`) }, 1000)
    })

    .then(() => {
        return order(() => { console.log(`Ice-cream was placed on ${stocks.holder[1]}`) }, 2000)
    })

    .then(() => {
        return order(() => { console.log(`${stocks.toppings[0]} was added as topping`) }, 3000)
    })

    .then(() => {
        return order(() => { console.log(`Ice-cream was served`) }, 2000)
    })

    .catch(() => { })

    .finally(() => { console.log('Ended'); })