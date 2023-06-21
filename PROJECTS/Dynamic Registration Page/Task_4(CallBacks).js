
//========== User's Code Starts Here ==========
// Dont touch this function. If you have please reset the code
//Only change create4thPost function given below
const posts = [
    {
        title: 'Post One',
        body: 'This is Post One',
        createdAt: new Date().getTime()
    },
    {
        title: 'Post Two',
        body: 'This is Post Two',
        createdAt: new Date().getTime()
    }
];

var interval;

// Dont touch this function. If you have please reset the code
//Only change create4thPost function given below
function getPost() {
    clearInterval(interval);
    interval = setTimeout(() => {
        posts.forEach((post) => {
            console.log(post.title);
        })
        process.exit();
    }, 1000);

}

// Dont touch this function. If you have please reset the code
//Only change create4thPost function given below
function createPost(post, callback) {
    setTimeout(() => {
        post.createdAt = new Date().getTime();
        posts.push(post);
        callback();
    }, 1000)
}

function create4thPost(post4, callback) {
    //fill in the blanks
    //hint => you have to smartly use callback function concept and use createPost and getPost smartly

    setTimeout(() => {
        posts.push(post4)
        callback(post4, getPost());  //fill in the blanks smartly
    }, 2000);
}

// Dont touch this function. If you have please reset the code
function fetchInput(postTitle, postBody) {
    create4thPost({ title: postTitle, body: postBody }, createPost);
}

//Dont change anything below. If changed click on reset.
async function readInput() {
    let inputString = '';
    var output = [];
    process.stdin.on('data', inputStdin => {
        inputString += inputStdin;
        const inputArr = inputString.split(/(?:\r\n|\r|\n)/g)
        output = new fetchInput(inputArr[0].split(',')[0], inputArr[0].split(',')[1]);


    })


}
readInput();
//========== User's Code Ends Here ==========