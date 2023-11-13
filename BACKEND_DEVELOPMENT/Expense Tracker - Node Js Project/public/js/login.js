
// Global variables or instances
let loginForm = document.querySelector('#formData')
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const loginBtn = document.querySelector('#login');
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
            if (response.status === 200) window.location.href = 'http://localhost:8001/homePage'
            console.log('response :', response);
            // alert('user logged in successfully')
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