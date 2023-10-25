
// Get Inputs ( Global Instance )
function getInputs() {
    let username = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let date = document.getElementById("date");
    let time = document.getElementById("time");
    // Make User Detail Object to save in database ( Global Instance )
    let detail = {
        Username: username.value,
        Email: email.value,
        Password: password.value,
        Date: date.value,
        Time: time.value
    }
    return detail
}

let get_a_call = document.getElementById('get_a_call')
get_a_call.addEventListener('click', submitData)

window.addEventListener('DOMContentLoaded', async function () {
    await axios.get('http://localhost:7055/user/')
        .then((response) => {
            for (let item of response.data) {
                showOutput(item.id, item)
            }
        })
        .catch((err) => {
            console.log(`Error in fetching data ${err.message}`)
        })
}
)

async function submitData(event) {
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
    } else if (await isDuplicateAppointment()) {
        duplicateError()
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove()
        }, 3000)
    } else {
        try {
            // send post request to backend
            let result = await axios.post('http://localhost:7055/user/add-user', detail)
            showOutput(result.data.id, result.data)
        }
        catch (error) {
            console.log(error.message);
        }
    }
}

async function deleteData(e) {
    let userList = document.getElementById('users')
    let output = document.getElementById('output')
    try {
        // delete div Element which contains li element and delete button
        e.target.parentNode.remove()

        // get inputs and clear them 
        let inputData = document.getElementsByClassName('form-control')
        for (let i = 0; i < inputData.length; i++) {
            inputData[i].value = ''
        }
        // delete data from database - so get data id to delete
        axios.delete(`http://localhost:7055/user/deleteUser/${e.target.id}`)

        if (userList.children.length <= 0) {
            output.style.display = 'none'
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function editData(e) {
    e.preventDefault()
    if (e.target.innerHTML == 'Edit') {
        try {
            // focus on first input elements
            document.getElementById('name').focus()

            // delete old database - so get a data id to delete and also change button text from Edit to Save
            // axios.delete(`http://localhost:7055/user/deleteUser/${e.target.id}`)

            // target input element and clear them
            let inputData = document.getElementsByTagName('input')

            // get saved data from database which we want to update
            const response = await axios.get(`http://localhost:7055/user/${e.target.id}`)
            const arr = Object.values(response.data);
            for (let i = 0; i < inputData.length; i++) {
                inputData[i].value = arr[i + 1]
            }
            e.target.innerHTML = 'Save'
        } catch (err) {
            console.log(err.message);
        }
    } else {
        saveData(e)
    }
}

async function saveData(e) {
    let oldData = e.target.parentElement.firstChild
    e.target.innerHTML = 'Edit'

    // get input to update data
    let detail = getInputs()

    if (detail['Username'] == '' || detail['Email'] == '' || detail['Date'] == '' || detail['Time'] == '' || detail['Password'] == '') {
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

        // Clear input field and send updated data to backend
        let inputData = document.getElementsByTagName('input');
        for (let i = 0; i < inputData.length; i++) {
            inputData[i].value = ''
        }
        // Update new data in database
        try {
            await axios.put(`http://localhost:7055/user/update-user/${e.target.id}`, detail)
        } catch (error) {
            console.log(error.message);
        }
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

async function isDuplicateAppointment() {
    // Get Inputs of current user and check this user in database if present or not
    let detail = getInputs()
    let result = false
    try {
        let response = await axios.get('http://localhost:7055/user/')
        for (let item of response.data) {
            if (item.user_name == detail.Username && item.email == detail.Email) {
                result = true;
                break
            }
        }
        return result
    } catch (err) {
        console.log(err.message);
    }
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
    let formattedDate = moment(detail['date']).format('DD MMM, YYYY')
    // Create div element
    let newDiv = document.createElement('div');

    // Create li element
    let li = document.createElement('li');

    // create textNode for li content
    let text = document.createTextNode(`${detail['user_name']} - ${detail['email']} - ${formattedDate} - ${detail.time}`);
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