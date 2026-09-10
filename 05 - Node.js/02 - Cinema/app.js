// get the http module:
const http = require('http');
// fs module allows us to read and write content for responses!!
const fs = require('fs');

// creating a server using http module:
const server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if(request.url === '/movies') {
        fs.readFile('views/index.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }

    else if(request.url === '/theaters') {
        fs.readFile('views/theaters.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }

    else if(request.url === '/movies/new') {
        fs.readFile('views/movies.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }

    else if (request.url === "/stylesheets/style.css") {
        fs.readFile('stylesheets/style.css', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-type': 'text/css'});
            response.write(contents); 
            response.end();
        });
    }
    else if (request.url.startsWith("/images/")) {
        const filepath = '.' + decodeURIComponent(request.url)
        fs.readFile(filepath, function (errors, contents){

            if (errors) {
                response.writeHead(400);
                response.write('Image not found!'); 
                response.end();
            }
            else {
                response.writeHead(200, {'Content-type': 'image/png'});
                response.write(contents); 
                response.end();
            }

        });
    }
    // request didn't match anything:
    else {
        response.writeHead(404);
        response.end('URL is not available!');
    }
});
// tell your server which port to run on
server.listen(7890);
// print to terminal window
console.log("Running in localhost at port 7890");