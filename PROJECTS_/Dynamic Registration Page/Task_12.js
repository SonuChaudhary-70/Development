let posts = []

function printPost() {
    posts.forEach(post => console.log(post.tittle))
}

function createPost(post){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            posts.push(post)
            resolve(updateLastUserActivityTime())
        },2000)
    })
}

function updateLastUserActivityTime(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            let lastActivity = new Date().toLocaleTimeString()
            console.log(lastActivity);
            resolve()
        },1000)
    })
}

// updateLastUserActivityTime()
createPost({ tittle : 'Post 1', body : 'this is post one'}).then(printPost)

























// function create4thPost(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() =>{
//             if(!error){
//                 posts.push({ tittle: 'Post 4', body: 'This is post four'})
//                 resolve()
//             }else{
//                 reject(err => console.log(err));
//             }
//         },2000)
//     })
// }
