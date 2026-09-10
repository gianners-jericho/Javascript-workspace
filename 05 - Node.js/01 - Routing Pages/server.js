const http = require('http');
const fs = require('fs');

const server = http.createServer(function (request, response){

    const routes = {
        "/village88": "village88.html",
        "/training/new": "form.html"
    }

    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if(request.url === '/') {
        fs.readFile('index.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    }
    else {
        const file = routes[request.url];
        console.log(routes)
        if(file){
            fs.readFile(file, 'utf8', function (errors, contents){
                response.writeHead(200, {'Content-type': 'text/html'});
                response.write(contents); 
                response.end();
            });
        }
        else {
            response.end('File not found!!!');
        }
    }
});
// tell your server which port to run on
server.listen(6789);
// print to terminal window
console.log("Running in localhost at port 6789");
