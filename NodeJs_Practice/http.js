const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    let data = 'Your Message'
    console.log(request.url);
    if (request.url === '/') {
        response.write('<html>')
        response.write(`<body>
        <form action='/message' method = 'POST'>
        <h1>${data}</h1>
        <div>
        <input type="text">
        <button type="submit">Submit</button>
        </div>
        </form>
        </body>`)
        response.write('</html>')
        return response.end()
    }
    if (request.url === '/message' && request.method === 'POST') {
        const body = []
        let message = ''
        request.on('data', (chunk) => {
            console.log('chunk');
            body.push(chunk)
        });
        request.on('end', () => {
            const parsedData = Buffer.concat(body).toString();
            message = parsedData.split('+').join(' ');
            console.log('message :',message);
            console.log('data :', parsedData);
        });
        fs.writeFile("message.txt", message, (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
            }
        });
        response.statusCode = 302
        response.setHeader('location', '/');
        return response.end();
    }
    response.setHeader('Content-Type', 'text/html');
    response.write('<html>')
    response.write('<head><head><title>My first page</title></head>')
    response.write('<body><h1>Hello from Node Js</h1></body>')
    response.write('</html>')
    response.end();
});

server.listen(8080)