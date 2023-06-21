// Change text color and background color of submit button
// let btn = document.querySelector('#btn');
// btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     e.target.style.backgroundColor = 'red'
//     e.target.style.color = 'White'
// })  


// Change background color of form
// let form = document.querySelector('#form');
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     e.target.style.backgroundColor = 'gray'
//     // console.log(e.target);
// })

// let email = document.querySelector('#email')
// email.addEventListener('mouseover', (event) => {
//     event.preventDefault();
//     alert('Hello')
// })

// Click Event
let sign = document.querySelector('#sign')
sign.addEventListener('click', onSubmit)

const username = document.querySelector('#username')
const email = document.querySelector('#inputEmail4')
const password = document.querySelector('#inputPassword4')
const msg = document.querySelector('.msg')
const users = document.querySelector('.users')

function onSubmit(event) {
    event.preventDefault();
    if (username.value == '' || email.value == '' || password.value == '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields'
        setTimeout(() => msg.remove(), 3000)
    }
    else {
        let detail = {
            username: username.value,
            email: email.value,
        }
        console.log(detail);
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(`
        ${username.value} : ${email.value}
        `))
        users.appendChild(li)

        // clear input fields
        username.value = ''
        email.value = ''
        password.value = ''
    }
}

// Mouseover Event
let add = document.querySelector('.add');
add.addEventListener('mouseover', (e) => {
    e.preventDefault();
    add.style.color = 'red'
})

// Mouseout event
add.addEventListener('mouseout', (e) => {
    add.style.color = 'black'
})