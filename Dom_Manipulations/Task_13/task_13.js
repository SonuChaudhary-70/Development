let get_a_call = document.getElementById('get_a_call')
get_a_call.addEventListener('click', takeValues)


function takeValues(event) {
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
    let stringifiedObj = JSON.stringify(detail);
    // console.log('User Details task_13 :', detail);
    localStorage.setItem(detail['Username'], stringifiedObj)

    // Create div element
    let newDiv = document.createElement('div');

    // Create li element
    let li = document.createElement('li');

    // create textNode for li content
    let text = document.createTextNode(`${detail['Username']} - ${detail['Email']} - ${detail['Date']} - ${detail['Time']}`);
    li.appendChild(text);

    // create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm ms-4 delete ';
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.onclick = deleteData

    // append li to div
    newDiv.appendChild(li)
    newDiv.appendChild(deleteBtn);
    newDiv.className = 'd-flex mt-2 flex-sm-wrap'
    newDiv.setAttribute('id', `${email.value}`)

    // append newDiv to ul
    let usersList = document.querySelector('#users')
    usersList.appendChild(newDiv)

}


function deleteData(e) {
    // delete div Element which contains li element and delete button
    e.target.parentNode.remove()

    // delete data from local storage - so get key to delete from content of li
    let text = e.target.parentElement.firstChild.textContent.split('-')
    let key = text[0].trim()
    localStorage.removeItem(key)
}

