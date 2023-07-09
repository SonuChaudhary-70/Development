let baseUrl = 'https://crudcrud.com/api/cae2f788621349659a463960a1e68efa/candyShop'

let add = document.getElementById('add');
add.addEventListener('click', addItem);

window.addEventListener('load', function () {
    let keys = Object.keys(this.localStorage)
    for (let item of keys) {
        // console.log(item);
        showOutput(JSON.parse(localStorage[item]));
    }
})

function getInputs() {
    let candyName = document.getElementById('name')
    let description = document.getElementById('description')
    let price = document.getElementById('price')
    let quantity = document.getElementById('quantity')

    let candyObj = {
        "Candy Name": candyName.value,
        Description: description.value,
        Price: price.value,
        Quantity: quantity.value
    }
    return candyObj
}

// async function addItem() {
//     try {
//         let obj = await getInputs()
//         console.log(obj);
//         let response = await axios.post(baseUrl, obj)
//         console.log(response);
//     } catch (error) {
//         console.log('Something went wrong :', error.message)
//     }
// }

function addItem() {
    let obj = getInputs()
    if (obj["Candy Name"] == '' || obj.Description == '' || obj.Price == '' || obj.Quantity == '') {
        console.log('Please fill ');
    } else {
        localStorage.setItem(obj["Candy Name"], JSON.stringify(obj))
        showOutput(obj)
    }
}

function showOutput(data) {
    let output = document.getElementById('output')
    output.parentElement.style.display = 'inline'

    let list = document.createElement('ul')
    list.className = 'd-flex justify-content-around'
    list.style = 'list-style-type:none'

    let name = document.createElement('li')
    name.innerHTML = data['Candy Name']

    let description = document.createElement('li')
    description.innerHTML = data.Description

    let price = document.createElement('li')
    price.innerHTML = data.Price

    let quantity = document.createElement('li')
    quantity.innerHTML = data.Quantity

    let buyBtn_1 = document.createElement('button')
    buyBtn_1.innerText = 'Buy 1'
    buyBtn_1.className = 'btn btn-primary'
    buyBtn_1.type = 'button'

    let buyBtn_2 = document.createElement('button')
    buyBtn_2.innerText = 'Buy 2'
    buyBtn_2.className = 'btn btn-primary ms-2'
    buyBtn_2.type = 'button'

    let buyBtn_3 = document.createElement('button')
    buyBtn_3.innerText = 'Buy 3'
    buyBtn_3.className = 'btn btn-primary ms-2'
    buyBtn_3.type = 'button'

    let divElement = document.createElement('div')
    divElement.className = ' d-flex justify-content-center'
    divElement.append(buyBtn_1, buyBtn_2, buyBtn_3)
    list.append(name, description, price, quantity, divElement)
    output.append(list)
}