// Global Instances
// sample image link - https://picsum.photos/

window.addEventListener('DOMContentLoaded', async (event) => {
    let getPost = await axios.get('http://localhost:7048/post/')
    try {
        getPost.data.forEach((post) => {
            displayPost(post, post.id);
        })
    }
    catch (error) {
        console.log('Error while fetching post: ' + error.message);
    }
})

// add post
let create = document.getElementById('create')
create.addEventListener('click', addPost)

// Get post inputs 
function getPostInputs() {
    let link = document.getElementById('postLink');
    let description = document.getElementById('description');
    return { link: link.value, description: description.value }
}

async function addPost(event) {
    event.preventDefault();
    let data = getPostInputs()

    // check if post link and description is empty or not
    if (data.link == '' || data.description == '') {
        alert("Please fill all fields");
    } else {
        try {
            // add post in database
            let response = await axios.post('http://localhost:7048/post/add-post', data)
            displayPost(data, response.data.id);
        }
        catch (error) {
            console.log(error);
        }
    }

}

function displayPost(postData, postId) {
    let postOutput = document.getElementById('post-content')
    // get data from backend to check if at least one post is stored or not
    // if stored then make the output visible else leave it hidden by changing its class name
    let btn = document.getElementById('post')
    if (!(postData == '' || postData == null)){
        btn.className = 'd-flex';
    }

    // CREATE UI TO DISPLAY POST
    // create img tag and set its attributes
    let img = document.createElement('img')
    img.src = postData.link;
    img.alt = postData.description;
    img.width = '480';
    img.height = '400';
    img.className = 'mt-2'

    // crate paragraph tag and set description
    let para = document.createElement('p');
    para.className = 'mt-2'
    para.innerText = 'User - ' + postData.description;

    // create comment tag
    let commentTag = document.createElement('p');
    commentTag.id = postId
    commentTag.innerHTML = 'Comment';
    commentTag.style.cursor = 'pointer';
    commentTag.onclick = createComment
    commentTag.addEventListener('click', (e) => {
        showPreviousComment(e.target.id)
    })

    // add all newly created tag to output window
    postOutput.appendChild(img);
    postOutput.appendChild(para);
    postOutput.appendChild(commentTag);
}

function createComment(e) {
    let createdCommentTag = document.getElementById(e.target.id)
    let commentInput = document.createElement('input');
    commentInput.placeholder = 'Write a Comment';
    commentInput.className = 'form-control rounded'

    let send = document.createElement('button');
    send.type = 'button';
    send.className = "ms-2 btn btn-light rounded";
    send.textContent = 'Send';
    // to pass argument in event handlers we can use arrow function like below
    send.addEventListener('click', () => { displayComment(e.target.id) })

    let div = document.createElement('div');
    div.className = "input-group mb-3 px-5";
    div.id = 'comment'
    div.appendChild(commentInput);
    div.appendChild(send);
    createdCommentTag.after(div);
}

async function displayComment(id) {
    let commentData = document.getElementById(id).nextSibling

    // save comment in DB  at backend
    axios.post('http://localhost:7048/comment/add-comment', { comment: commentData.firstChild.value, postId:id });

    // create paragraph for USER which do comment on post
    let user = document.createElement("p")
    user.innerHTML = 'Anonymous -&nbsp'
    user.className = 'text-warning'
    user.style.wordWrap = 'keep-all'

    // create paragraph for COMMENT 
    let para = document.createElement('p');
    para.style.wordBreak = 'break-all'
    para.innerHTML = commentData.firstChild.value;

    // now create div to add or align both user and its comment in a row
    let commentStr = document.createElement('div');
    commentStr.className = 'd-flex'

    // now add user and comment in div
    commentStr.appendChild(user);
    commentStr.appendChild(para)

    // append this newly created div with user and his comment into our comments section of posts
    commentData.after(commentStr)
}

async function showPreviousComment(postId) {
    let cmtTag = document.getElementById(postId).nextSibling

    // fetch previous saved comment from database
    const prevCmt = await axios.get(`http://localhost:7048/comment/${postId}`)

    // display all previous comments
    prevCmt.data.forEach((response) => {

        // create paragraph for USER which do comment on post
        let user = document.createElement("p")
        user.innerHTML = 'Anonymous -&nbsp'
        user.className = 'text-warning'
        user.style.wordWrap = 'keep-all'

        // create paragraph for COMMENT 
        let cmt = document.createElement('p');
        cmt.style.wordBreak = 'break-all'
        cmt.innerHTML = response.comment;

        // now create div to add or align both user and its comment in a row
        let commentStr = document.createElement('div');
        commentStr.className = 'd-flex'

        // now add user and comment in div
        commentStr.appendChild(user);
        commentStr.appendChild(cmt);

        // append this newly created div with user and his comment into our comments section of posts
        cmtTag.after(commentStr)
    })
}