// GLOBAL INSTANCES
function getInputs() {
    // Get Inputs ( Global Instance )
    let username = document.getElementById("name");
    let email = document.getElementById("email");
    let date = document.getElementById("date");
    let time = document.getElementById("time");

    // Make User Detail Object to save in database ( Global Instance )
    let detail = {
        Username: username.value,
        Email: email.value,
        Date: date.value,
        Time: time.value
    }
    return detail
}

let get_a_call = document.getElementById('get_a_call')
get_a_call.addEventListener('click', addAppointment)


window.addEventListener('DOMContentLoaded', function () {
    let storedItems = Object.keys(localStorage)
    for (let item of storedItems) {
        let parsedData = JSON.parse(localStorage[item])
        showOutput(parsedData.Email, parsedData)
    }
})

async function addAppointment(event) {
    event.preventDefault()

    // call getInputs function to get the details of the user
    let detail = getInputs()
    if (detail['Username'] == '' || detail['Email'] == '' || detail['Date'] == '' || detail['Time'] == '' || password.value == '') {
        errorMsg()
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove()
        }, 3000)
    } else if (isDuplicateAppointment()) {
        duplicateError()
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove()
        }, 3000)
    } else {
        localStorage.setItem(detail.Email, JSON.stringify(detail))
        showOutput(detail.Email, detail)
    }
}

function deleteData(e) {
    let userList = document.getElementById('users')
    let output = document.getElementById('output')
    // delete div Element which contains li element and delete button
    e.target.parentNode.remove()

    // get inputs and clear them 
    let inputData = document.getElementsByClassName('form-control')
    inputData[0].value = ''
    for (let i = 0; i < inputData.length; i++) {
        inputData[i].value = ''
    }

    // delete data from database - so get data id to delete
    localStorage.removeItem(e.target.id)

    // if the user want to edit data add button disabled then he has only option to save data. But if user delete data instead to save then add button still disabled
    // so this condition is to check if add button disabled make it enable for proper functioning
    if(document.getElementById('get_a_call').disabled = true)  document.getElementById('get_a_call').disabled = false;

    // if no Appointment left the then make the output window disappear
    if (userList.children.length <= 0) {
        output.style.display = 'none'
    }
}

function editData(e) {
    e.preventDefault()
    if (e.target.innerHTML == 'Edit') {
        // focus on first input elements
        document.getElementById('name').focus()

        // target input element and clear them
        let inputData = document.getElementsByTagName('input')
        for (let i = 0; i < inputData.length; i++) {
            inputData[i].value = ''
            e.target.innerHTML = 'Save'
            document.getElementById('get_a_call').disabled = true;
        }
    } else {
        saveData(e)
    }
}

function saveData(e) {
    let oldData = e.target.parentElement.firstChild

    // get input to update data
    let detail = getInputs()
    let password = document.getElementById("password");
    
    if (detail['Username'] == '' || detail['Email'] == '' || detail['Date'] == '' || detail['Time'] == '' || password.value == '') {
        errorMsg()
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove()
        }, 3000)
    } else {
        // Update new data in output window
        let newData = `${detail['Username']} - ${detail['Email']} - ${detail['Date']} - ${detail['Time']}`
        oldData.textContent = newData

        // Update new data in local storage
        localStorage.setItem(detail.Email,JSON.stringify(detail))
        e.target.innerHTML = 'Edit'
        document.getElementById('get_a_call').disabled = false;
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
    // Get Input
    let detail = getInputs()
    let result = false
    let storedItems = Object.keys(localStorage)
    for (let item of storedItems) {
        let parsedData = JSON.parse(localStorage[item])
        if (parsedData.Username == detail.Username && parsedData.Email == detail.Email) {
            result = true;
            break
        }
    }
    return result
}

function duplicateError() {
    let form = document.getElementById('error')
    form.className = 'd-flex text-light border mt-1 rounded border-2 bg-danger'
    let p = document.createElement('p')
    p.className = 'd-flex pt-2 ps-2 h5'
    p.textContent = 'Appointment with this Email Id Already Exist !!!'
    p.style.fontFamily = 'Trebuchet MS'
    form.appendChild(p)
}

function showOutput(data_id, detail) {

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
    deleteBtn.id = data_id
    deleteBtn.onclick = deleteData

    // create edit button 
    let editBtn = document.createElement('button')
    editBtn.className = 'btn btn-success btn-sm ms-4 edit ';
    editBtn.innerHTML = 'Edit';
    editBtn.id = data_id
    editBtn.onclick = editData

    // append li to div
    newDiv.appendChild(li)
    newDiv.appendChild(editBtn);
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