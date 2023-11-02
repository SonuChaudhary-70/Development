
function getInputs() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    return { email: email.value, password: password.value }
}

// check user login details
document.getElementById('login')
    .addEventListener('submit', function (e) {
        // e.preventDefault()
        let credentials = getInputs()
        if (credentials.email == '' || credentials.password == '') {
            alert('Please enter all required fields')
        } else {
            axios.post(`http://localhost:3001/user/login`, credentials)
                .then(response => {
                    // alert(`${response.status} : ${response.data.message}`)
                })
                .catch(error => {
                    console.log('error while login :', error);
                })
        }
    })

// check user registered or not
document.getElementById('email')
    .addEventListener('change', async (e) => {
        let credentials = getInputs();
        let userNotExistErr = document.getElementById('userNotExistErr');
        if (credentials.email == '') {
            alert('Please enter all fields')
        } else {
            axios.post(`http://localhost:3001/user/login/email`, credentials)
                .then((response) => {
                    userNotExistErr.classList.replace('d-flex', 'd-none')
                })
                .catch((error) => {
                    userNotExistErr.innerHTML = error.response.data.message + '. Please enter valid email'
                    userNotExistErr.classList.replace('d-none', 'd-flex')
                })
        }
    })

// check user password correct or incorrect
document.getElementById('password')
    .addEventListener('change', async (e) => {
        let credentials = getInputs();
        let passErr = document.getElementById('passErr')
        if (credentials.email == '' || credentials.password == '') {
            alert('Please enter all fields')
        } else {
            axios.post(`http://localhost:3001/user/login/pass`, credentials)
                .then((response) => {
                    passErr.classList.replace('d-flex', 'd-none')
                })
                .catch((error) => {
                    passErr.innerHTML = error.response.data.message + '. Please enter correct password'
                    passErr.classList.replace('d-none', 'd-flex')
                })
        }
    })

