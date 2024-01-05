
// Global variables or instances
const loginForm = document.querySelector('#login_form_data')
const loginEmail = document.querySelector('#login_email');
const loginPassword = document.querySelector('#Password');
const loginBtn = document.querySelector('#login');
const resetPasswordBtn = document.querySelector('#resetPassword');
const resetPasswordEmail = document.querySelector('#typeEmail')
let userNotExistErr = document.querySelector('#userNotExistErr');
let passErr = document.querySelector('#login_pass_err');
let forgotPassEmailErr = document.querySelector('#forgotPassEmail')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let credentials = {
        email: loginEmail.value,
        password: loginPassword.value
    };
    if(loginForm.checkValidity()){
        console.log('worked fine');
        try {
            let response = await axios.post(`http://localhost:8001/user/login`, credentials);
            if (response.status === 200) {
                localStorage.setItem('token', JSON.stringify(response.data.token))
                alert('user logged in successfully')
                window.location.href = 'http://localhost:8001/homePage'
            }
        }
        catch (err) {
            console.log(err);
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
    if (resetPasswordEmail.value == '') {
        showError(forgotPassEmailErr, 'Please enter valid email address')
    }
    const token = JSON.parse(localStorage.getItem('token'));
    let response = await axios.post('http://localhost:8001/password/forgot-password', { email: resetPasswordEmail.value }, { headers: { 'Authorization': token } });
    if (response.data.success) {
        alert(`Reset password email sent.You should soon receive an email allowing you to reset your password. Please make sure to check your spam and trash if you can't find the email.`)
    } else {
        alert(response.data.message)
    }
    window.location.reload()
})

