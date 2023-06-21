const posts = [{ title: 'Post One' }, { title: 'Post Two' }];

//Do not touch this function below
function printPost() {
    posts.forEach((post) => {
        console.log(post.title)
    })
}

//Do not touch this function below
function create3rdPost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push({ title: 'post Three' });
            resolve()
        }, 3000)
    })
}

//Do not touch this function below
function create4thPost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push({ title: 'post Four' });
            resolve();
        }, 2000)
    })
}

// Correct the lines below smartly such that post three gets printed before post four
create3rdPost().then(create4thPost).then(printPost)
