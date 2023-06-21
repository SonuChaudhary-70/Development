function create3rdPost(callback) {
    setTimeout(() => {
        console.log('Post Three')
        //If callback function is passed call it
        if (callback) {
            callback();
        }
    }, 3000)
}
function create4thPost(callback) {
    setTimeout( () => {
        console.log('Post Four')
        callback()
    }, 2000);
}
function create5thPost() {
    setTimeout( () => {
        console.log('Post Five')
    }, 1000);
}

create4thPost(create3rdPost(create5thPost))