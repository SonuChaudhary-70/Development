// PROMISE - promise is an object { data : undefined } which has some property data and it value. It works asynchronously and whenever it runs at first the data has undefined. after the promise full fill/resolve undefined is replaced with exact data that we want by our promise object

// A promise is an object representing eventual(happening as a result at the end of a period of time or of a process) completion or failure of an asynchronous operation.

// eventual - in simple terms we can say that it is a future result which  and we will get this result after some time or after completion of some process.

// synchronous means happening of something with respect to time (time ke sath sath) and synchronous programming means execution of code step by step

// asynchronous means happening of something with or with not respect to time. asynchronous programming means execution of code without waiting for anything. In this it will execute some LOD after some time 
// Promise remove inter dependency OR Callback Hell with in the code or program in JS

// Lets Understand use of Promise by callback hell example by ordering a pizza with some beverages from dominos site
function orderPizza(type, name) {

    // Query the dominos for a store. Here query is api
    query(`/api/dominos/`, function (result, error) {
        if (!error) {
            let shopId = result.shopId;

            // Get the store and query pizzas
            query(`/api/dominos/pizza/${shopId}`, function (result, error) {
                if (!error) {
                    let pizzas = result.pizzas;

                    // Find if my pizza is available
                    let myPizza = pizzas.find((pizza) => {
                        return (pizza.type === type && pizza.name === name);
                    });

                    // Check for the free beverages
                    query(`/api/dominos/beverages/${myPizza.id}`, function (result, error) {
                        if (!error) {
                            let beverage = result.id;

                            // Prepare an order
                            query(`/api/order`, { 'type': type, 'name': name, 'beverage': beverage }, function (result, error) {
                                if (!error) {
                                    console.log(`Your order of ${type} ${name} with ${beverage} has been placed`);
                                } else {
                                    console.log(`Bad luck, No Pizza for you today!`);
                                }
                            });

                        }
                    })
                }
            });
        }
    });
}

// Call the orderPizza method
orderPizza('veg', 'margherita');

// Above code is hard to maintain and difficult to read. Hence we use promises

// Get the promise object by some inbuilt method / producing function
let user_instagram_url = 'https://www.instagram.com/mo_hini8240?igshid=MzRIODBiNWFIZA=='
let response = fetch(user_instagram_url)  // ==> promise producing function / producing inbuilt method
console.log(typeof response);
