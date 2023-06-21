
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
    let stringifiedObj = JSON.stringify(detail);
    // console.log('hello')
    console.log('User Details task_11 :', detail);
    localStorage.setItem('User Details', stringifiedObj)
}
