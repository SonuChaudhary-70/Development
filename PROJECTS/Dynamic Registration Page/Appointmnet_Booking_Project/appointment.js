// GLOBAL INSTANCES
let baseUrl = 'https://crudcrud.com/api/a01de57d2e09493ea91c9c58cab58563/bookingData'

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
get_a_call.addEventListener('click', submitData)

// window.addEventListener('DOMContentLoaded', async function () {
//     try {
//         let response = await axios.get(baseUrl)
//         for (let item of response.data) {
//             showOutput(item._id, item)
//         }
//     } catch (err) {
//         console.log(err.message);
//     }
// }
// )

window.addEventListener('DOMContentLoaded', function () {
    axios.get(baseUrl)
        .then((response) => {
            for (let item of response.data) {
                showOutput(item._id, item)
            }
        })
        .catch((err) => {
            console.log(`Error fetching data ${err.message}`)
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
        }, 1500)
    } else if (await isDuplicateAppointment()) {
        duplicateError()
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove()
        }, 3000)
    } else {
        try {
            let response = await axios.post(baseUrl, detail)
            showOutput(response._id, detail)
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
        inputData[0].value = ''
        for( let i = 0; i < inputData.length; i++ ){
            inputData[i].value = ''
        }

        // delete data from database - so get data id to delete
        axios.delete(`${baseUrl}/${e.target.id}`)

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
            await axios.delete(`${baseUrl}/${e.target.id}`)

            // target input element and clear them
            let inputData = document.getElementsByTagName('input')
            for( let i = 0; i < inputData.length; i++ ){
                inputData[i].value = ''
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

        // Update new data in database
        try {
            await axios.post(`${baseUrl}`, detail)
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
    // Get Input
    let detail = getInputs()
    let result = false
    try {
        let response = await axios.get(baseUrl)
        for (let item of response.data) {
            if (item.Username == detail.Username && item.Email == detail.Email) {
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