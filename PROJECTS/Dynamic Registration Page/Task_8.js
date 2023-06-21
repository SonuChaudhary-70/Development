const posts = [{title: 'POST1'},{title: 'POST2'}];

// Do not touch the following function
function printPost() {
        posts.forEach((post) => {
            console.log(post.title)
        })
}
// Do not touch the following function
function create3rdPost() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            posts.push({title: 'POST3'});
            resolve()
        }, 3000)
    }) 
}
// Do not touch the following function
function create4thPost() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            posts.push({title: 'POST4'});
            resolve();
        }, 2000)
    }) 
}
// Complete the following function 
//It should add POST5 to posts array with setTimeout of 1 second
function create5thPost(){
    //should return a promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push({ title: 'POST5' })
            resolve()
        }, 1000)
    })
}

// The following 4 lines need to be fixed too
create3rdPost().then(create4thPost).then(create5thPost).then(printPost)
