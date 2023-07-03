let posts = []

function printPost() {
    setTimeout(() => {
        let output = ''
        posts.forEach((post) => {
            output += `<li> ${post.tittle}</li>`
            console.log(output);
        })
        document.getElementById('output').innerHTML = output
    }, 1000)
}

function getPost() {
    posts.forEach(post => console.log(post.tittle))

}

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post)
            // resolve(updateLastUserActivityTime)
            resolve()
        }, 1000)
    })
}

function updateLastUserActivityTime() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let lastActivity = new Date().toLocaleTimeString()
            console.log('Last Seen :', lastActivity);
            resolve(lastActivity)
        }, 1000)
    })
}

// updateLastUserActivityTime()
// createPost({ tittle : 'Post 1', body : 'this is post one'}).then(printPost)
Promise.all([createPost({ tittle: 'Post 1', body: 'this is post one' }), createPost({ tittle: 'Post 2', body: 'this is post two' }), createPost({ tittle: 'Post 3', body: 'this is post three' }), updateLastUserActivityTime()]).then(printPost)