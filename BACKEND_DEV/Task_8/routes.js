const fs = require('fs');

function requestHandler(req, res) {
    if (req.url === '/') {
        res.write('<html>')
        res.write('<head><title>Server</title></head>')
        res.write('<body><form action="/message" method="POST" ><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>')
        return res.end()
    }
    if (req.url === '/message' && req.method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            body.push(chunk); // accumulate chunks of data in the array "body"
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body)
            let messageData = parsedBody.toString().trim().split('=')[1]
            let data = messageData.split('+').join(' ')
            fs.writeFileSync('message.txt', data, (err) => {
                if (err) throw err;
                res.statusCode = 302;
                res.setHeader('Location', '/')
                console.log(data);
                return res.end();
            });
        });
    }
    fs.readFile('message.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>Server</title></head>')
        res.write(`<body><h1>${data}</h1></body>`);
        res.write('</html>')
        res.end()
    });
}

module.exports = requestHandler;