let get_a_call = document.getElementById('get_a_call')
// get_a_call.addEventListener('submit', submitData)
get_a_call.addEventListener('click', submitData)

window.addEventListener('load',function(){
    let keys = Object.keys(localStorage)
    for( let item of keys ){
        let data = JSON.parse(localStorage.getItem(item))
        showOutput(data)
    }
})

function submitData(event) {
    event.preventDefault();
        // Get Inputs
        let username = document.getElementById("name");
        let email = document.getElementById("email");
        let date = document.getElementById("date");
        let time = document.getElementById("time");
    
        // Make User Detail Object to save in local storage
        let detail = {
            Username: username.value,
            Email: email.value,
            Date: date.value,
            Time: time.value
        }

    if (detail['Username'] == '' || detail['Email'] == '' || detail['Date'] == '' || detail['Time'] == '' || password.value == '') {
        errorMsg()
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove()
        }, 1500)
    } else if (isDuplicateAppointment()) {
        duplicateError()
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove() 
        },1500)
    } else {

        // store data in local storage
        let stringifiedObj = JSON.stringify(detail);
        localStorage.setItem(detail['Email'], stringifiedObj)

        showOutput(detail)
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
    if (e.target.innerHTML == 'Edit') {
        // focus on first input elements
        document.getElementById('name').focus()

        // delete old data from local storage - so get a key to delete from content of li and also change button text from Edit to Save
        let text = e.target.parentElement.firstChild.textContent.split('-')
        let key = text[1].trim()
        localStorage.removeItem(key)
        e.target.innerHTML = 'Save'

        // target input element and clear them
        let inputData = document.getElementsByTagName('input')
        inputData[0].value = ''
        inputData[1].value = ''
        inputData[2].value = ''
        inputData[3].value = ''
        inputData[4].value = ''
    } else {
        saveData(e)
    }
}

function saveData(e) {
    let oldText = e.target.parentElement.firstChild
    e.target.innerHTML = 'Edit'

    // update content from local storage
    let username = document.getElementById("name");
    let email = document.getElementById("email");
    let date = document.getElementById("date");
    let time = document.getElementById("time");

    if (username.value == '' || email.value == '' || date.value == '' || time.value == '') {
        console.log('empty');
        errorMsg()
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove()
        }, 1000)
    } else {
        let detail = {
            Username: username.value,
            Email: email.value,
            Date: date.value,
            Time: time.value
        }

        // Update new data in output window
        let newText = `${detail['Username']} - ${detail['Email']} - ${detail['Date']} - ${detail['Time']}`
        oldText.textContent = newText

        // Update new data in local storage
        let stringifiedObj = JSON.stringify(detail);
        localStorage.setItem(detail['Email'], stringifiedObj)
    }
}

function errorMsg() {
    let div = document.getElementById('error')
    div.className = 'd-flex text-light border border-2 rounded bg-danger mb-1'

    let p = document.createElement('p')
    p.className = 'd-flex pt-2 ps-2 h5'
    p.textContent = 'Error :- All fields are required'
    p.style.fontFamily = 'Trebuchet MS'
    div.appendChild(p)
}

function isDuplicateAppointment() {
    let email = document.getElementById("email").value;
    let localStorageExistingData = JSON.parse(localStorage.getItem(email))
    console.log(localStorageExistingData);
    return (localStorageExistingData != null && localStorageExistingData['Email'] == email)
}

function duplicateError(){
    let form = document.getElementById('error')
    form.className = 'd-flex text-light border mt-1 rounded border-2 bg-danger'
    let p = document.createElement('p')
    p.className = 'd-flex pt-2 ps-2 h5'
    p.textContent = 'Appointment with this Email Id Already Exist !!!'
    p.style.fontFamily = 'Trebuchet MS'
    form.appendChild(p)
}


function showOutput(detail) {

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
    newDiv.className = 'd-flex mt-2 flex-sm-wrap border border-2 border-dark rounded p-1'
    newDiv.setAttribute('id', `${email.value}`)

    // append newDiv to ul
    let usersList = document.querySelector('#users')
    usersList.appendChild(newDiv)

    // make output visible
    let output = document.getElementById('output')
    output.style.display = 'inline'
}