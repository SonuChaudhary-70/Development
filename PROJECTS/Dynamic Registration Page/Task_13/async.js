console.log(('person 1 : show tickets'));
console.log(('person 2 : show tickets'));

const myFriendBringsTickets = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('tickets')
    }, 3000);
})

let getPopCorn = myFriendBringsTickets.then((t) => {
    console.log(`Wife : I have the tickets`);
    console.log('Husband : we should go in');
    console.log('Wife : I am hungry');
    return new Promise((resolve, reject) => resolve(`${t}  popcorn`))
});

let getButter = getPopCorn.then((t) => {
    console.log(`Husband : I got some popcorn`);
    console.log('Husband : we should go in');
    console.log('Wife : I need some butter on my popcorn');
    return new Promise((resolve, reject) => resolve(`${t}  butter`))
});

getButter.then((t) => console.log(t))

console.log(('person 4 : show tickets'));
console.log(('person 5 : show tickets'));