console.log(('person 1 : show tickets'));
console.log(('person 2 : show tickets'));

const preMovie = async () => {
    const myFriendBringsTickets = new Promise((resolve, reject) => {
        setTimeout(() => reject('tickets'), 3000)
    });

    let ticket
    try {
        ticket = await myFriendBringsTickets
    }
    catch {
        ticket = 'sad face'
    }

    let getPopCorn = new Promise((resolve, reject) => resolve(`popcorn`))
    let popCorn = await getPopCorn

    let getColdDrink = new Promise((resolve, reject) => resolve('Cold Drink'))
    let coke = await getColdDrink

    let addButter = new Promise((resolve, reject) => resolve(`butter`))
    let butter = await addButter

    let obj = {
        Get_Popcorn: popCorn,
        Get_Cold_Drink: coke,
        Add_Butter: butter,
    }

    // console.log(obj);

    return ticket
}

preMovie().then((m) => console.log(`Person 3 : show ${m}`))
console.log(('person 4 : show tickets'));
console.log(('person 5 : show tickets'));