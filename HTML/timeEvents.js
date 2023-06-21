function show() {
    let div = document.getElementById('demo')
    div.style.display = 'inline'
    let para = document.getElementById('para')
    para.innerHTML = 'Hello World'
    para.className = 'ps-5 text-danger'
}

setTimeout(show,3000)