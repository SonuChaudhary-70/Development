// Add some functionality to element
let clicked = (e) => {
    let container = document.querySelector('#main')
    container.style.backgroundColor = 'rgb(186, 181, 181)'

    let newDiv = document.createElement('div')
    let content = document.createTextNode('Clicked')
    newDiv.appendChild(content);
    container.insertBefore(newDiv, container.lastElementChild)
    // console.log('Event :',e);
    // console.log('Event Target :',e.target);
    // console.log('Event Type :',e.type);
    // console.log('Event Class Name :',e.target.className);
    // console.log('Event Class List :',e.target.classList);
    // console.log('Mouse Clicked Location X-axis and Y-axis:',e.clientX, e.clientY);
    // console.log(e.altKey);
}

// new way of adding events
let button = document.querySelector('#main')



// MOUSE Events
function runEvent(e) {
    console.log(`Event Type : ${e.type}`);
    let output = document.getElementById('output');
    output.innerHTML = `<h5>Mouse Position <br> x-axis :${e.offsetX}
    <br>y-axis :${e.offsetY}</h5>`;
    // box.style.backgroundColor = 'rgb('+e.offsetX+','+e.offsetY+','+10+')'
    document.body.style.backgroundColor = 'rgb('+e.offsetX+','+e.offsetY+','+10+')'

    // console.log(`Mouse position x-axis :`, e.offsetX);
    // console.log(`Mouse position y-axis :`, e.offsetY);
}

// click event
// button.lastElementChild.addEventListener('click', runEvent)

// Double Click event
// button.lastElementChild.addEventListener('dblclick', runEvent)

// Mouse Down Event
// button.lastElementChild.addEventListener('mousedown', runEvent)

// Mouse Up Event
// button.lastElementChild.addEventListener('mouseup', runEvent)

let box = document.querySelector('#box')

// Mouse Hover Events
// 'Mouse Enter in Green Box'
// box.addEventListener('mouseenter', runEvent)

// Mouse Leave
// box.addEventListener('mouseleave', runEvent)

// Mouse over
// box.addEventListener('mouseover', runEvent)

// Mouse Out
// box.addEventListener('mouseout', runEvent)

// NOTE - mouseover and mouseenter are of same functionality similarly mousedown and mouseout are of same functionality
// But main difference is that mouseenter only fires when cursor enter inside the target where mouseover is fired same but in addition if their some content present in target and cursor position on the content then only mouseover is fired
// But main difference is that mouseleave only fires when cursor leave out the target where mouseover is fired same but in addition if their some content present in target and cursor leave out the content then only mouseout is fired

// Mouse Move
box.addEventListener('mousemove', runEvent)

// Get mouse position of x-axis and y-axis when mouse move
// box.addEventListener('mousemove', runEvent)
