// Global Variables 
const user_name = document.querySelector('#signUpUserName')
const phone_num = document.querySelector('#signUpPhoneNo')
const email = document.querySelector('#signUpEmailId')
const password = document.querySelector('#signUpPassword');
const signUpBtn = document.querySelector('#signUpBtn');
const signUpForm = document.querySelector('#signUpForm');

signUpForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const credentials = {
		username: user_name.value,
		phone_num: phone_num.value,
		email: email.value,
		password: password.value
	}
	if (credentials.username == '' || credentials.phone_num == '' || credentials.email == '' || credentials.password == '') {
		console.log('empty');
	} else {
		try{
			const signUpResponse = await axios.post('http://localhost:6508/user/sign-up/add-user', credentials);
			console.log('sign up response:', signUpResponse);
		}catch(err){
			console.log('Error while sign up :',err.response.data.error);
		}
	}
})	