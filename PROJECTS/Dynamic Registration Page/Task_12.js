let posts = []

function printPost() {
    posts.forEach(post => console.log(post.tittle))
}

function createPost(post){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            posts.push(post)
            resolve(updateLastUserActivityTime())
        },1000)
    })
}

function updateLastUserActivityTime(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            let lastActivity = new Date().toLocaleTimeString()
            console.log('Last Seen :',lastActivity);
            resolve()
        },2000)
    })
}

// updateLastUserActivityTime()
createPost({ tittle : 'Post 1', body : 'this is post one'}).then(printPost)