
// Global variables or instances
const loginForm = document.querySelector('#formData')
const loginEmail = document.querySelector('#email');
const loginPassword = document.querySelector('#password');
const loginBtn = document.querySelector('#login');
const resetPasswordBtn = document.querySelector('#resetPassword');
const resetPasswordEmail = document.querySelector('#typeEmail')
let errDiv = document.querySelector('#errMsg');
let userNotExistErr = document.querySelector('#userNotExistErr');
let passErr = document.querySelector('#passErr');


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let credentials = {
        email: loginEmail.value,
        password: loginPassword.value
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

resetPasswordBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    let email = resetPasswordEmail.value
    let response = await axios.post('http://localhost:8001/user/password/forgot-password', email)
    console.log(response);
    // alert('password reset link send to your email id')
    // http://localhost:8001/user/password/forgot-password
})