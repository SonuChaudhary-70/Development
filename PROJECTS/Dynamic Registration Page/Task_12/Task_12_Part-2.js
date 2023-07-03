const posts = [
    { tittle: 'Post 1', body: 'This is pots one' },
    { tittle: 'Post 2', body: 'This is pots two' },
]


function getPost() {
    setTimeout(() => {
        let output = ''
        posts.forEach((post, index) => {
            output += `<li> ${post.tittle}</li>`;
        });
        document.getElementById('output').innerHTML = output
    }, 1000);
}

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post)
            resolve()
        }, 2000)
    })
}

createPost({ tittle: 'Post 3', body: 'This is pots three' }).then(getPost)

const Promise1 = new Promise((resolve, reject) => {
    console.log("Promise 1")
})
const Promise2 = 10
const Promise3 = Promise.resolve((resolve, reject) => {
    setTimeout(resolve, 2000, 'bye')
})

Promise.all([Promise1, Promise2, Promise3])
Promise1.then()



