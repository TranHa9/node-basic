const http = require('http');

const server = http.createServer((req, res) => {
    console.log('run request...')
    res.setHeader('Content-Type', 'text/html');
    res.write('<h3>Hello world</h3>');
    res.write('<h2>chao ha</h2>');
    res.end();
})

server.listen(3000, 'localhost', () => {
    console.log('node.JS-server is runing on port: 3000')
})