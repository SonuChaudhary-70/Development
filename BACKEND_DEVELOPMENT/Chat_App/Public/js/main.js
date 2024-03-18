

// $(document).ready(function () {
//     $("a.open-modal").click(function () {
//         $(this).modal({
//             fadeDuration: 200,
//             showClose: false
//         })
//         return false;
//     })
// })

// Get the modal elements
const loginModal = document.getElementById('sign-in-authentication-modal');
const signupModal = document.getElementById('sign-up-modal');

// Get the buttons to toggle modals
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

// Toggle login modal
loginBtn.addEventListener('click', function () {
    // loginModal.style.display = 'block';
    $("#loginModal").modal.hide()
    $("#signupModal").modal.show()

});

// Toggle signup modal
signupBtn.addEventListener('click', function () {
    // signupModal.style.display = 'block';
    $("#signupModal").modal('show');

});

// Close modals when clicking outside
// window.addEventListener('click', function (event) {
//     if (event.target == loginModal || event.target == signupModal) {
//         loginModal.style.display = 'none';
//         signupModal.style.display = 'none';
//     }
// });