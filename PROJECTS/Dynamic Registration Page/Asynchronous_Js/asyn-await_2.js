console.log(('person 1 : show tickets'));
console.log(('person 2 : show tickets'));

const preMovie = async () => {
    const myFriendBringsTickets = new Promise((resolve, reject) => {
        setTimeout(() => resolve('tickets'), 3000)
    });

    // let ticket = await myFriendBringsTickets
    // console.log(`Wife : I have the ${ticket}`);
    // console.log('Husband : we should go in');
    // console.log('Wife : I am hungry');

    let getPopCorn = new Promise((resolve, reject) => resolve(`popcorn`))
    let getColdDrink = new Promise((resolve, reject) => resolve('Cold Drink'))
    let addButter = new Promise((resolve, reject) => resolve(`butter`))


    // let popcorn = await getPopCorn;

    // console.log(`Husband : I got some ${popcorn}`);
    // console.log('Husband : we should go in');
    // console.log('Wife : I need some butter on my popcorn');

    // let addButter = new Promise((resolve, reject) => resolve(`butter`))
    // let butter = await addButter

    // console.log(`Husband : I got some ${butter} on ${popcorn}`);
    // console.log(`Husband : Anything else Darling..??`);
    // console.log(`Wife : I also want cold drink with my popcorn`);

    // let getColdDrink = new Promise((resolve, reject) => resolve('Cold Drink'))
    // let coldDrink = await getColdDrink

    // console.log(`Husband : I got ${coldDrink} to drink`);
    // console.log('Husband : Anything else mam...?');
    // console.log(`Wife : Lets go we are getting late `);
    // console.log(`Husband : Thank you for the remainder *Grins`);

    return ticket
}

preMovie().then((m) => console.log(`Person 3 : show ${m}`))
console.log(('person 4 : show tickets'));
console.log(('person 5 : show tickets'));