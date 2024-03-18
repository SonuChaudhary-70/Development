// Get the modal elements
const loginModal = document.getElementById('sign-in-authentication-modal');
const signupModal = document.getElementById('sign-up-modal');

// Get the buttons to toggle modals
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

// Toggle login modal
loginBtn.addEventListener('click', function () {
    loginModal.style.display = 'block';
});

// Toggle signup modal
signupBtn.addEventListener('click', function () {
    signupModal.style.display = 'block';
});

// Close modals when clicking outside
window.addEventListener('click', function (event) {
    if (event.target == loginModal || event.target == signupModal) {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    }
});



// let container = document.getElementById('container')

// toggle = () => {
// 	container.classList.toggle('sign-in')
// 	container.classList.toggle('sign-up')
// }

// setTimeout(() => {
// 	container.classList.add('sign-in')
// }, 200)
