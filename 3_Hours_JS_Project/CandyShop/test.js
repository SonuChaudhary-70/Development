async function subtraction(event) {
    let parent = event.target.parentNode.parentNode;
    let stock = document.getElementById(parent.id).children[3]
    try {
        let response = await axios.get(`${baseUrl}/${parent.id}`)
        let quantityLeft = response.data.Quantity
        console.log(`Stock left :${quantityLeft} Item to buy :${event.target.id}`);
        if ((quantityLeft - event.target.id == 2) && (event.target.id > 2)) {
            alert(`Can't buy 3 item try to buy some less`)
        } else if ((quantityLeft - event.target.id == 1) && (event.target.id > 1)) {
            alert(`Can't buy 2 item try to buy some less`)
        } else if (stock.innerHTML < 1) {
            alert("You have reached the minimum limit of this item")
            stock.innerHTML = 0
        }
        else {
            // Decrease quantity on display window
            stock.innerHTML =  stock.innerHTML - event.target.id
            // update quantity in database
            await axios.put(`${baseUrl}/${parent.id}`, {
                "Candy_Name": parent.children[0].innerHTML,
                Description: parent.children[1].innerHTML,
                Price: parent.children[2].innerHTML,
                Quantity: stock.innerHTML - event.target.id
            })
        }
    } catch (err) {
        console.log(err.message);
    }

}