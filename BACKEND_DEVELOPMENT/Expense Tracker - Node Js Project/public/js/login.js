
// Global variables or instances
let loginForm = document.querySelector('#formData')
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const loginBtn = document.querySelector('#login');
const resetPassword = document.querySelector('#resetPassword');
const typeEmail = document.querySelector('#typeEmail')
let errDiv = document.querySelector('#errMsg');
let userNotExistErr = document.querySelector('#userNotExistErr');
let passErr = document.querySelector('#passErr');


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let credentials = {
        email: email.value,
        password: password.value
    };
    if (!loginForm.checkValidity()) {
        showError(errDiv, 'Please enter all required fields');
    } else {
        try {
            let response = await axios.post(`http://localhost:8001/user/login`, credentials);
            if (response.status === 200) {
                localStorage.setItem('token', JSON.stringify(response.data.token))
                alert('user logged in successfully')
                window.location.href = 'http://localhost:8001/homePage'
            }
        }
        catch (err) {
            if (err.response.status == 404) {
                showError(userNotExistErr, "User not exist");
            } else {
                showError(passErr, "Password not match : Unauthorized User");
            }
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

resetPassword.addEventListener('click', (e) => {
    e.preventDefault()
    let email = typeEmail.value
    console.log(email);
    typeEmail.checkValidity()
    axios.post('http://localhost:8001/user/password/forgot-password', email)
    // alert('password reset link send to your email id')
    // http://localhost:8001/user/password/forgot-password
})