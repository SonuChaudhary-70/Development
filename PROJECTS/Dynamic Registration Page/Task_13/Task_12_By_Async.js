const posts = [
    { tittle: 'Post 1', body: 'This is pots one' },
    { tittle: 'Post 2', body: 'This is pots two' },
]

async function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post)
            resolve()
        }, 2000)
    })
}


async function getPost(posts) {
    return new Promise((resolve, reject) => {
        posts.forEach((post, index) => {
            console.log(post);
        })
    })
}

async function deletePosts(posts) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.pop()
            resolve()
        }, 2000)
    })
}

async function main(arrayOfPosts) {
    console.log('Before creating a post :', arrayOfPosts);
    await createPost({ tittle: 'Post 3', body: "this is Post three" })
    console.log('after creating a post :', arrayOfPosts);

    console.log('Deleted Post :', await deletePosts(arrayOfPosts));
    console.log('After delete :', arrayOfPosts);

    console.log(await getPost(arrayOfPosts));
}

main(posts)