
// Global variables
// let inputs = document.getElementsByTagName('input');
let passwordErr = document.querySelector("#signUp_pass_err");
let repeat = document.querySelector("#repeatPassErr");
let userExistErr = document.querySelector("#userExist");
let signUp_Form = document.querySelector("#signup_formData")

document.getElementById('signup_formData')
signUp_Form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // check typed password match or not
    // if (inputs[2].value != inputs[3].value) 
    if (signUp_Form[2].value != signUp_Form[3].value) {
        // inputs[2].style.backgroundImage = 'none'
        // inputs[3].style.backgroundImage = 'none'
        console.log(signUp_Form[2].value);
        console.log(signUp_Form[3].value);
        // showError(passwordErr, 'Password did not matched')
        showError(repeat, 'Password did not matched')
    }
    else {
        let userDetails = {
            username: signUp_Form[0].value,
            email: signUp_Form[1].value,
            password: signUp_Form[2].value
        }
        try {
            let response = await axios.post('http://localhost:8001/user/sign-up', userDetails);
            // localStorage.setItem('token', JSON.stringify(response.data.token))
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

document.getElementById('signUp_email')
    .addEventListener('change', async function (e) {
        try {
            let response = await axios.post(`http://localhost:8001/user/${e.target.value}`);
            if (response.status == 200) {
                signUp_Form[1].style.backgroundImage = 'none'
                showError(userExistErr, 'User with this email already exists')
            }
        }
        catch (error) {
            console.log('err :', error.response.data);
        }
    })

