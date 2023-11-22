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

// Global variables
let inputs = document.getElementsByTagName('input');
let passErr = document.querySelector("#passErr");
let repeat = document.querySelector("#repeatPassErr");
let userExistErr = document.querySelector("#userExist");


document.getElementById('formData')
    .addEventListener('submit', async (e) => {
        e.preventDefault()

        // check typed password match or not
        if (inputs[2].value != inputs[3].value) {
            inputs[2].style.backgroundImage = 'none'
            inputs[3].style.backgroundImage = 'none'
            showError(passErr, 'Password did not matched')
            showError(repeat, 'Password did not matched')
        }
        else {
            let userDetails = {
                username: inputs[0].value,
                email: inputs[1].value,
                password: inputs[2].value
            }
            try {
                let response = await axios.post('http://localhost:8001/user/sign-up', userDetails);
                if (response.status == 200) {
                    alert('User signed up successfully.\nNow please login with same credentials')
                    window.location.href = 'http://localhost:8001/'
                }
            }
            catch (err) {
                console.log('error :', err);
            }
        }
    })

function showError(element, errMsg) {
    element.innerHTML = errMsg;
    element.classList.replace('d-none', 'd-flex');
    setTimeout(() => {
        element.classList.replace('d-flex', 'd-none')
    }, 2000)
}

document.getElementById('email')
    .addEventListener('change', async function (e) {
        try {
            let response = await axios.post(`http://localhost:8001/user/${e.target.value}`);
            if (response.status == 200) {
                inputs[1].style.backgroundImage = 'none'
                showError(userExistErr, 'User with this email already exists')
            }
        }
        catch (error) {
            console.log('err :', error.response.data);
        }
    })

