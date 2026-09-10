const http = require('http');
const static = require('./static');

const server = http.createServer(function (request, response){
    static(request, response, "public/");
});

server.listen(6789);
console.log("Running in localhost at port 6789");
