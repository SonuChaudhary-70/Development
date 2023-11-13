// Example starter JavaScript for disabling form submissions if there are invalid fields
// this is Immediately Invoked Function Expression (IIFE) 
(function () {
    'use strict'

    // Fetch all the forms we want to apply validation styles to
    let forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    // Array.prototype.slice.call(forms)
    forms.forEach(function (form) {
        form.addEventListener('submit', function (event) {
            // checkValidity method Returns true if an input element contains valid data.
            if (!form.checkValidity()) {
                event.preventDefault()
                // stopPropagation() method prevents propagation of the same event from being called.
                // matlab stop propagation method event to propagate or we can say execute karne se rok deta hai
                event.stopPropagation()
            }
            form.classList.add('was-validated');
            // false as an argument is liye pass kiye jisse capturing disable ho jaye
            // capturing means event propagation from parent to child
        }, false)
    })
})()

let checkPassword = document.querySelector('#repeated-password')
    .addEventListener('change', function (e) {
        let prevPassword = document.getElementById('password').value;
        let passErr = document.getElementById('passErr');
        let repeatPassErr = document.getElementById('repeatPassErr');
        if (prevPassword != e.target.value) {
            passErr.innerHTML = 'Password does not match';
            repeatPassErr.innerHTML = 'Password does not match';
            passErr.classList.replace('d-none', 'd-flex')
            repeatPassErr.classList.replace('d-none', 'd-flex')
        } else {
            passErr.classList.replace('d-flex', 'd-none')
            repeatPassErr.classList.replace('d-flex', 'd-none')
        }
    })

let isUserExist = document.getElementById('email')
    .addEventListener('change', function (e) {
        axios.post(`http://localhost:3001/user/${e.target.value}`)
            .then((response) => {
                let email = document.getElementById('userExist')
                if (response.data.status) {
                    email.innerHTML = 'User with this email already exists'
                    email.classList.replace('d-none', 'd-flex')
                } else {
                    email.classList.replace('d-flex', 'd-none')
                }
            })
            .catch((error) => {
                console.log('error get from user exist route :', error);
            })
    })

let submitForm = document.getElementById('formData')
    .addEventListener('submit', submitData)


function submitData(e) {
    let inputs = document.getElementsByTagName('input');

    // first check if input field is empty or not
    if (inputs[0].value == '' || inputs[1].value == '' || inputs[2].value == '' || inputs[3].value == '') {
        alert("Please fill all the fields");
    } else {
        let userDetails = {
            username: inputs[0].value,
            email: inputs[1].value,
            password: inputs[2].value
        }
        axios.post('http://localhost:3001/user/sign-up', userDetails)
            .then((response) => {
                e.target.reset()
            })
            .catch((error) => {
                console.log('error :', error);
            })
    }
}
