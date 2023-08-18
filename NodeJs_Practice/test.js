let content = "";
let readStream = fs.createReadStream('message.txt');

readStream.on('data', function (chunk) {
    content += chunk
})


readStream.on('end', function () {
    return
    // console.log(content)
})

console.log('Content :', content);
// let readData = async function () {
//     let msg = ''
//     await fs.readFile('message.txt', 'utf8', (err, data) => {
//         if (err) throw err;
//         msg = data
//         // return data
//     });
//     return msg;
// }
// console.log('data :', readData);
// fs.readFile('message.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log('Data :', data);
//     // content = data
// })