
// Global variables
let inputs = document.getElementsByTagName('input');
let passwordErr = document.querySelector("#signUp_pass_err");
let repeat = document.querySelector("#repeatPassErr");
let userExistErr = document.querySelector("#userExist");

document.getElementById('signup_formData')
    .addEventListener('submit', async (e) => {
        e.preventDefault()

        // check typed password match or not
        if (inputs[2].value != inputs[3].value) {
            console.log(inputs[2]);
            console.log(inputs[3]);
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
                inputs[1].style.backgroundImage = 'none'
                showError(userExistErr, 'User with this email already exists')
            }
        }
        catch (error) {
            console.log('err :', error.response.data);
        }
    })

