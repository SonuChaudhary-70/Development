let container = document.getElementById('container')

toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)

// Global Variables 
const user_name = document.querySelector('#signUpUserName')
const phone_num = document.querySelector('#signUpPhoneNo')
const email = document.querySelector('#signUpEmailId')
const password = document.querySelector('#signUpPassword');
const signUpBtn = document.querySelector('#signUpBtn');
const signUpForm = document.querySelector('#signUpForm');

console.log(signUpForm);
signUpBtn.addEventListener('click', async () => {
	const credentials = {
		username: user_name.value,
		phone_num: phone_num.value,
		email: email.value,
		password: password.value
	}
	if (credentials.username == '' || credentials.phone_num == '' || credentials.email == '' || credentials.password == '') {
		console.log('empty');
	} else {
		const signUpResponse = await axios.post()
		console.log('not empty');
		console.log(credentials);
	}
})