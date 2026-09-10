// https://atlas.altitudeiq.ai/learn/course/17/lesson/614

const http = require('http');
const fs = require('fs');
const path = require('node:path')

const PORT = 6543;

const server = http.createServer(async function (request, response){
    
    //routes
    if(request.url === '/'){
        fs.readFile('welcome.html', 'utf8', function (error, contents){
            response.writeHead(200, {'Content-Type': 'text/html'}); //writes the response headers
            response.write(contents); //writes to the response body
            response.end();
        });
    }
    else if (request.url === '/village88'){
        fs.readFile('village88.html', 'utf8', function (error, contents){
            response.writeHead(200)
            response.write(contents);
            response.end();
        })
    }
    else if (request.url === "/training/new"){
        fs.readFile('training.html', 'utf8', function(error, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        })
    }

    else{
        response.end("requested URL is not available")
    }
})

server.listen(PORT)