
let loginBtn = document.getElementById('login')
    .addEventListener('click', function (e) {
        e.preventDefault()
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        let credentials = {
            email: email.value,
            password: password.value
        }
        if (email == '' || password == '') {
            alert('Please enter all required fields')
        }
        console.log(credentials);
        axios.post(`http://localhost:4001/user/login`, credentials)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    })