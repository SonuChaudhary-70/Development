// Global Instances
// sample image link - https://picsum.photos/
let baseUrl = 'http://localhost:7048'

window.addEventListener('DOMContentLoaded', async () => {
    let response = await axios.get('http://localhost:7048/post/')
    try {
            response.data.forEach((post) => {
            displayPost(post);
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

function addPost(event) {
    event.preventDefault();
    let data = getPostInputs()

    // check if post link and description is empty or not
    if (data.link == '' || data.description == '') {
        alert("Please fill all fields");
    } else {
        // add post in database
        axios.post('http://localhost:7048/post/add-post', data)
        displayPost(data);
    }

}

function displayPost(postData) {
    let postOutput = document.getElementById('post-content')
    // get data from backend to check if at least one post is stored or not
    // if stored then make the output visible else leave it hidden by changing its class name
    let btn = document.getElementById('post')
    btn.className = 'flex';

    // make output window
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

    // create comment
    let commentTag = document.createElement('p');
    commentTag.id = 'commentTitle'
    commentTag.innerHTML = 'Comment';
    commentTag.style.cursor = 'pointer';
    commentTag.onclick = createComment

    // add all newly created tag to output window
    postOutput.appendChild(img);
    postOutput.appendChild(para);
    postOutput.appendChild(commentTag);
}
// to check if createComment event handler function is clicked or not
let hasClicked = false;

function createComment(e) {
    if (!hasClicked) {
        let postOutput = document.getElementById('post-content')
        let commentInput = document.createElement('input');
        commentInput.placeholder = 'Write a Comment';
        commentInput.className = 'form-control rounded'

        let send = document.createElement('button');
        send.type = 'button';
        send.className = "ms-2 btn btn-light rounded";
        send.textContent = 'Send';
        send.onclick = displayComment

        let div = document.createElement('div');
        div.className = "input-group mb-3 px-5";
        div.id = 'comment'
        div.appendChild(commentInput);
        div.appendChild(send);
        postOutput.appendChild(div);
    }
    // createComment function is executed hence we need to stop to create further create comment UI
    hasClicked = true;
}

function displayComment(e) {
    let comment = e.target.parentNode.children[0].value

    // save comment in the dataBase at backend
    axios.post('http://localhost:7048/comment/add-comment', { comment: comment });

    // get the element/tag after the will be displayed
    let createComment = document.getElementById('comment')

    // create paragraph for user which do comment on post
    let user = document.createElement("p")
    user.innerHTML = 'Anonymous -&nbsp'
    user.className = 'text-warning'
    user.style.wordWrap = 'keep-all'

    // create paragraph for comment which user does
    let para = document.createElement('p');
    para.style.wordBreak = 'break-all'
    para.innerHTML = comment;

    // now create div to add or align both user and its comment in a row
    let commentStr = document.createElement('div');
    commentStr.className = 'd-flex'

    commentStr.appendChild(user);
    commentStr.appendChild(para)
    createComment.after(commentStr)
}