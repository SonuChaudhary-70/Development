let get_a_call = document.getElementById('get_a_call')
get_a_call.addEventListener('click', submitData)


function submitData(event) {
    event.preventDefault();
    let username = document.getElementById("name");
    let email = document.getElementById("email");
    let date = document.getElementById("date");
    let time = document.getElementById("time");

    let detail = {
        Username: username.value,
        Email: email.value,
        Date: date.value,
        Time: time.value
    }
    if (detail['Username'] == '' || detail['Email'] == '' || detail['Date'] == '' || detail['Time'] == '') {
        errorMsg()
        setTimeout(() =>{
            let errorMsg = document.getElementById('error')
            errorMsg.remove()
        },3000)
    } else {
        // store data in local storage
        let stringifiedObj = JSON.stringify(detail);
        localStorage.setItem(detail['Email'], stringifiedObj)

        // Create div element
        let newDiv = document.createElement('div');

        // Create li element
        let li = document.createElement('li');

        // create textNode for li content
        let text = document.createTextNode(`${detail['Username']} - ${detail['Email']} - ${detail['Date']} - ${detail['Time']}`);
        li.appendChild(text);

        // create delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm ms-2 delete ';
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.onclick = deleteData

        // create edit button 
        let edit = document.createElement('button')
        edit.className = 'btn btn-success btn-sm ms-4 edit ';
        edit.innerHTML = 'Edit';
        edit.onclick = editData

        // append li to div
        newDiv.appendChild(li)
        newDiv.appendChild(edit);
        newDiv.appendChild(deleteBtn);
        newDiv.className = 'd-flex mt-2 flex-sm-wrap'
        newDiv.setAttribute('id', `${email.value}`)

        // append newDiv to ul
        let usersList = document.querySelector('#users')
        usersList.appendChild(newDiv)
    }
}


function deleteData(e) {
    // delete div Element which contains li element and delete button
    e.target.parentNode.remove()

    // delete data from local storage - so get key to delete from content of li
    let text = e.target.parentElement.firstChild.textContent.split('-')
    let key = text[1].trim()
    localStorage.removeItem(key)
}

function editData(e) {
    e.preventDefault()
    // delete data from local storage - so get key to delete from content of li
    let text = e.target.parentElement.firstChild.textContent.split('-')
    let key = text[1].trim()
    localStorage.removeItem(key)

    // target input element
    let inputEle = document.getElementsByTagName('input')
    text[0] = inputEle[0].value
    text[1] = inputEle[1].value
    let joinedText = text.join('-')

    // Update content of li element
    e.target.parentElement.firstChild.textContent = joinedText

    // update content from local storage
    let username = document.getElementById("name");
    let email = document.getElementById("email");
    let date = document.getElementById("date");
    let time = document.getElementById("time");

    let detail = {
        Username: username.value,
        Email: email.value,
        Date: date.value,
        Time: time.value
    }

    // store data in local storage
    let stringifiedObj = JSON.stringify(detail);
    localStorage.setItem(detail['Email'], stringifiedObj)
}

function errorMsg() {
    let div = document.getElementById('error')
    div.className = 'd-flex text-light border border-2 bg-danger'

    let p = document.createElement('p')
    p.className = 'd-flex pt-2 ps-2 h5'
    p.textContent = 'Error :- All fields are required'
    p.style.fontFamily = 'Trebuchet MS'
    div.appendChild(p)
}
// function editData(e) {
//     e.preventDefault()
//     // delete data from local storage - so get key to delete from content of li
//     let text = e.target.parentElement.firstChild.textContent.split('-')
//     let key = text[1].trim()
//     localStorage.removeItem(key)

//     // target input element
//     let inputEle = document.getElementsByTagName('input')
//     text[0] = inputEle[0].value
//     text[1] = inputEle[1].value
//     let joinedText = text.join('-')
//     e.target.parentElement.firstChild.textContent = joinedText
//     localStorage.setItem(text[1], JSON.stringify(joinedText))
// }