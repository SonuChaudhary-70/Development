const toggleBtn = document.querySelector(".navbar-burger");
const closeBtn = document.querySelector(".closeBtn");
const dropdown = document.querySelector(".dropdown");

toggleBtn.onclick = () => {
    dropdown.classList.replace("d-none", 'd-flex');
    toggleBtn.classList.add('d-none');
    closeBtn.classList.replace("d-none", 'd-flex')
}
closeBtn.onclick = () => {
    dropdown.classList.replace('d-flex', 'd-none');
    closeBtn.classList.replace('d-flex', "d-none")
    toggleBtn.classList.remove('d-none');
}

$(document).ready(function () {
    $("a.open-modal").click(function () {
        $(this).modal({
            fadeDuration: 200,
            showClose: false
        })
        return false;
    })
})