
function takeValues(event) {
    event.preventDefault();
    let username = document.getElementById("name");
    let email = document.getElementById("email");
    let date = document.getElementById("date");
    let time = document.getElementById("time");
    let detail = {
        Username: username.value,
        Email: email.value,
        Date: date.value,
        Time: time.value
    }
    localStorage.setItem('username', username.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('date', date.value);  
    localStorage.setItem('time', time.value);
    console.log(object.keys(detail));
    // console.log(detail)
}

// localStorage.clear()


let obj = {
    username:'Sonu',
    email:'sonu@gmail.com',
    date:'12/12/2020',
    time:'10:30 AM'
};

console.log(Object.values(obj));