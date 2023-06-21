
function takeValues(event) {
    event.preventDefault();
    let form = document.getElementById("form");
    let detail = {
        Username: form.username.value,
        Email: form.email.value,
        phone: form.phone.value,
        Date: form.date.value,
        Time: form.time.value
    }
    console.log(detail)
}