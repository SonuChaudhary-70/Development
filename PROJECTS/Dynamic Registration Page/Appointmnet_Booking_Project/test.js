function editData(e) {
    e.preventDefault()
    // delete data from local storage - so get key to delete from content of li
    let text = e.target.parentElement.firstChild.textContent.split('-')
    let key = text[1].trim()
    localStorage.removeItem(key)

    // target input element
    let inputEle = document.getElementsByTagName('input')
    text[0] = inputEle[0].value
    text[1] = inputEle[1].value
    let joinedText = text.join('-')

    // Update content of li element
    e.target.parentElement.firstChild.textContent = joinedText

    // update content from local storage
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

    // store data in local storage
    let stringifiedObj = JSON.stringify(detail);
    localStorage.setItem(detail['Email'], stringifiedObj)
}