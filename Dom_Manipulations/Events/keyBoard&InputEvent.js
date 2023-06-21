function runEvent(e) {
    console.log('Event Type :', e.type);
    // document.getElementById('items').firstElementChild.innerHTML = e.target.value;
    // if (e.type == 'paste') {
    //     alert("Don't Paste Anything")
    //     e.target.value = null
    // }
}

let itemInput = document.querySelector('input[type=text]')

// Key Down Event
// itemInput.addEventListener('keydown', runEvent)

// Key Up Event
// itemInput.addEventListener('keyup', runEvent)

// Key press Event
// itemInput.addEventListener('keypress', runEvent)

// Focus Event
// itemInput.addEventListener('focus', runEvent)

// Blur Event
// itemInput.addEventListener('blur', runEvent)

// Cut Text Event
// itemInput.addEventListener('cut', runEvent)

// Paste Event
// itemInput.addEventListener('paste', runEvent)

// Input Event - If we do anything(type,cut,copy) with input tag this event will be triggered
itemInput.addEventListener('input', runEvent)



// Form Submit Event
let form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("event Type:",e.type);
})