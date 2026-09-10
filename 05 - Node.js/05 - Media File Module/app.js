const http = require('http');
const fs = require('fs');
const static_content = require('./static.js');

const PORT = 8920
const server = http.createServer(function(request, response){
    static_content(request, response);
});

server.listen(PORT);
console.log(`Running in localhost at port ${PORT}`);
