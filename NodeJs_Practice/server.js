const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    let data = fs.readFileSync('message.txt', 'utf8')
    if (request.url === '/') {
        response.write('<html>')
        response.write(`<body>
        <form action='/message' method = 'POST'>
        <h1 style='word-spacing:10px'>${data}</h1>
        <div>
        <input type="text" name="message">
        <button type="submit">Submit</button>
        </div>
        </form>
        </body>`)
        response.write('</html>')
        return response.end();
    }
    else if (request.url === '/message' && request.method === 'POST') {
        const body = []
        request.on('data', chunk => {
            body.push(chunk)
        });
        return request.on('end', () => {
            const parsedData = Buffer.concat(body).toString();
            const data = parsedData.split('=')[1]
            let message = ''
            if (data == '') {
                message += 'undefined'
            } else {
                message += data.split('+').join(' ')
            }
            fs.writeFile("message.txt", message, (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully\n");
                }
                response.statusCode = 302
                response.setHeader('Location', '/');
                return response.end()
            });
        });
    }
    else {
        response.setHeader('Content-Type', 'text/html');
        response.write('<html>');
        response.write('<head><title>My First Page</title><head>');
        response.write('<body><h1>Hello from my Node.js Server!</h1></body>');
        response.write('</html>');
        response.end();
    }
});

console.log('serving now')
server.listen(8080);