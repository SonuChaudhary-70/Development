// AXIOS GLOBALS - some globals values which are used for all requests
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'


// Note :- AXIOS's ALL METHODs WITH ASYNC / AWAIT
async function getTodo() {
    try {
        let response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
        show_output(response)
    }
    catch (error) {
        show_error(error);
    }

}

async function addTodo() {
    let newDataToAdd = {
        title: 'New data has been added',
        body: 'some new text here.',
        completed: true
    }

    try {
        let response = await axios.post('https://jsonplaceholder.typicode.com/todos', newDataToAdd)
        show_output(response)
    }
    catch (error) {
        show_error(error);
    }
}

async function updateTodo() {
    // in put request we need to pass data(like user id or any other id) id that we want to update
    try {
        // PUT Method
        // let data = {
        //     title: "Data has been updated",
        //     completed: true
        // }
        // let response = await axios.put('https://jsonplaceholder.typicode.com/todos/1', data)
        // show_output(response);

        // PATCH Method
        let data = {
            title: "Data has been updated",
            completed: true
        }
        let response = await axios.patch('https://jsonplaceholder.typicode.com/todos/1', data)
        show_output(response);
    }
    catch (error) {
        show_error(error);
    }
}

async function removeTodo() {
    // in delete request we need to pass id of data (like user detail) that we want to delete
    try {
        let response = await axios.delete('https://jsonplaceholder.typicode.com/todos/1')
        show_output(response)
    } catch (error) {
        show_error(error);
    }
}

// Get Simultaneously ( which means एक ही समय ) requests of different types or same type request
async function getData() {
    // get todo data posts and photos data from different urls
    let todo_url = "https://jsonplaceholder.typicode.com/todos?_limit=10"
    let post_url = "https://jsonplaceholder.typicode.com/posts?_limit=10"
    let photos_url = "https://jsonplaceholder.typicode.com/photos?_limit=10"
    await axios.all([
        axios.get(todo_url),
        axios.get(post_url),
        axios.get(photos_url)
    ])
        .then(axios.spread((todo, posts, photos) => show_output(photos)))
}

async function custom_headers() {
    let newDataToAdd = {
        title: 'New data has been added',
        body: 'some new text here.',
        completed: true
    }

    let config = {
        headers: {
            authorization: 'some token value',
            'Last-Modified': 'any past date',
            'Accept-Ranges': "bytes"
        }
    }
    try {
        let response = await axios.post('https://jsonplaceholder.typicode.com/todos', newDataToAdd, config)
        show_output(response)
    }
    catch (error) {
        show_error(error);
    }
}


async function error_handler() {
    try {
        let response = await axios.get('https://jsonplaceholder.typicode.com/todoss?_limit=10')
        show_output(response)
    }
    catch (error) {
        // show_error(error);
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(error.response.headers);
        } else if (error.response.status == 404) {
            alert(error.message);
        } else {
            console.log(error.request);
        }
    }
}

async function cancel() {
    const source = axios.CancelToken.source();

    try {
        let response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10',{
            cancelToken :source.token
        })
        show_output(response)
    }
    catch (error) {
        show_error(error);
    }
    // if(true){
    //     source.cancel('Request Canceled')
    // }
}

// Axios Instances

// INTERCEPTING REQUESTS AND RESPONSES
// Intercepting means adding addition functionality or a callback function each and every request we made.
// Interceptors will apply before sending a request or before receiving a response 
axios.interceptors.request.use(
    config => {
        let date = new Date()
        console.log(`${config.method.toUpperCase()} request sent to  ${config.url} at ${date.toLocaleTimeString()}`);
        return config
    }, error => { return Promise.reject(error) }
)

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
            <div class="card-body border border-info border-1 bg-success">
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