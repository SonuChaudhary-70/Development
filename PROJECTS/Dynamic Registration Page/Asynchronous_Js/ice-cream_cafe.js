// make ice-cream for a customer and process for it goes like this - 

// order from customer
// fetch ingredients 
// start production of ice-cream
// serve

// ICE-CREAM productions USING CALLBACK WHICH FORM CALLBACK HELL AFTER SOMETIME

let stocks = {
    Fruits: ["strawberry", "grapes", "banana", "apple"],
    liquid: ["water", "ice"],
    holder: ["cone", "cup", "stick"],
    toppings: ["chocolate", "peanuts"],
};

let order = (Fruit_Name, call_production) => {
    setTimeout(() => {
        console.log(`${stocks.Fruits[Fruit_Name]} Was selected`);
        call_production()
    }, 2000)
}

let productions = (call_fetchIngredients) => {
    setTimeout(() => {
        console.log('Order received. Production has started ');

        setTimeout(() => {
            console.log(`Fruits has been chopped`);

            setTimeout(() => {
                console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} was added`);

                setTimeout(() => {
                    console.log(`Machine has been started`);

                    setTimeout(() => {
                        console.log(`Ice-cream was filled in ${stocks.holder[1]}`);

                        setTimeout(() => {
                            console.log(`${stocks.toppings[0]} was added as topping`);

                            setTimeout(() => {
                                console.log(`Ice-cream was served`);
                            }, 2000)
                        }, 3000)

                    }, 2000)

                }, 1000)

            }, 1000);

        }, 2000)

    }, 0)
    // call_fetchIngredients()
}

order(2, productions)