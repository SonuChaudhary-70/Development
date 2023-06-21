//========== User's Code Starts Here ==========

// Do not touch this function at all
function create3rdPost(callback) {
    setTimeout(() => {
        console.log('Post Three')
        //If callback function is passed call it
        if (callback) {
            callback();
        }
    }, 2000)
}

// Do not touch this function at all
function create4thPost() {
    setTimeout(() => {
        console.log('Post Four')
    }, 1000);
}

//========== User's Code Ends Here ==========

//You have to  modify the syntax below to reach the desired output
create3rdPost(create4thPost)

