// Note :- AXIOS ALL METHOD WITHOUT ASYNC / AWAIT

function getTodo() {
    // axios({
    //     method: 'GET',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     responseType: 'json',
    //     params: {
    //         _limit: 10
    //     }
    // })

    //  WE CAN WRITE ALL PROPERTIES OF AXIOS IN A SINGLE LINE LIKE GIVEN BELOW
    // axios.get('https://jsonplaceholder.typicode.com/todos',{params:{_limit: 10}})

    //  WE CAN WRITE ALL PROPERTIES OF AXIOS IN ONLY URL ALSO
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then((response) => show_output(response))
        .catch((error) => show_error(error));
}


function addTodo() {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: "new data has been added",
        completed: true
    })
        .then((response) => show_output(response))
        .catch((error) => show_error(error));
}

function updateTodo() {
    let data = {
        title: "Data has been updated",
        completed: true
    }
    axios.patch('https://jsonplaceholder.typicode.com/todos/1', data)
        .then((response) => show_output(response))
        .catch((error) => show_error(error));
}

function removeTodo() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
        .then((response) => show_output(response))
        .catch((error) => show_error(error));
}

function getData() {
    // get todo data posts and photos data from different urls
    let todo_url = "https://jsonplaceholder.typicode.com/todos?_limit=10"
    let post_url = "https://jsonplaceholder.typicode.com/posts?_limit=10"
    let photos_url = "https://jsonplaceholder.typicode.com/photos?_limit=10"
    axios.all([
        axios.get(todo_url),
        axios.get(post_url),
        axios.get(photos_url)
    ])
        .then(axios.spread((todo, posts, photos) => show_output(todo)))
}

function custom_headers() {
    console.log('custom_handler');
}

function transform() {
    console.log('transform');
}

function error_handler() {
    console.log('error_handler');
}

function cancel() {
    console.log('cancel');
}

// attach event handlers to each button
let get = document.getElementById('GET')
get.addEventListener('click', getTodo)

let post_btn = document.getElementById('POST')
post_btn.addEventListener('click', addTodo)

let put_btn = document.getElementById('PUT')
put_btn.addEventListener('click', updateTodo)

let delete_btn = document.getElementById('DELETE')
delete_btn.addEventListener('click', removeTodo)

let custom_btn = document.getElementById('header')
custom_btn.addEventListener('click', custom_headers);

let transform_btn = document.getElementById('Transform')
transform_btn.addEventListener('click', transform);

let sim_request_btn = document.getElementById('Sim')
sim_request_btn.addEventListener('click', getData);

let error_btn = document.getElementById('Error')
error_btn.addEventListener('click', error_handler);

let cancel_btn = document.getElementById('Cancel')
cancel_btn.addEventListener('click', cancel);


function show_output(response_data) {
    let { status, headers, data, config } = response_data
    let output = document.getElementById('output')
    let show_response = `
    <div class='d-flex flex-column align-items-center'>
        <!-- response status -->
        <div class="card my-4 w-75">
            <div class="card-body border border-info border-1">
                <h5>Status: ${status}</h5>
            </div>
        </div>

        <!-- response headers -->
        <div class="card  border-info border-1 mb-3 w-75">
            <div class="card-header border-info">Header</div>
            <div class="card-body">
                <pre class="card-text">${JSON.stringify(headers, null, 4)}</pre>
            </div>
        </div>

        <!-- response data -->
        <div class="card border-info border-1 mb-3 w-75">
            <div class="card-header border-info">Data</div>
            <div class="card-body">
                <pre class="card-text">${JSON.stringify(data, null, 4)}</pre>
            </div>
        </div>

        <!-- response config -->
        <div class="card border-info border-1 mb-3 w-75">
            <div class="card-header border-info">Config</div>
            <div class="card-body">
                <pre class="card-text">${JSON.stringify(config, null, 4)}</pre>
            </div>
        </div>
    </div>
    `
    output.innerHTML = show_response
}

function show_error(err) {
    let output = document.getElementById('output')
    if (err.response == undefined) {
        let show_error = `
        <div class="d-flex justify-content-center my-4">
        <div class="card border-danger mb-3" style="max-width: 30rem;">
            <div class="card-header display-6">Status : ${0}</div>
            <div class="card-body text-danger">
                <h5 class="card-title">Message : ${err.message}</h5>
            </div>
        </div>
        </div>`
        output.innerHTML = show_error
    } else {
        let show_error = `
        <div class="d-flex justify-content-center my-4">
        <div class="card border-danger mb-3" style="max-width: 30rem;">
            <div class="card-header display-6">Status : ${err.response.status}</div>
            <div class="card-body text-danger">
                <h5 class="card-title">Message : ${err.message}</h5>
            </div>
        </div>
        </div>`
        output.innerHTML = show_error
    }
}