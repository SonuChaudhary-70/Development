
function showOutput() {
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
    newDiv.className = 'd-flex mt-2 flex-sm-wrap border border-2'
    newDiv.setAttribute('id', `${email.value}`)

    // append newDiv to ul
    let usersList = document.querySelector('#users')
    usersList.appendChild(newDiv)

    // make output visible
    let output = document.getElementById('output')
    output.style.display = 'inline'
}


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