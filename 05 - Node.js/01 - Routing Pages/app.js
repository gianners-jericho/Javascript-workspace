import { createServer } from 'http';
import { readFile } from 'fs';

//create the server
const server = createServer(function(request, response){
    console.log('client request URL: ', request.url);

    //routing to the three different views
    if(request.url === '/'){
        readFile('welcome.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    else if (request.url === '/village88'){
        readFile('village88.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    else if (request.url === '/training/new'){
        readFile('training.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    // request didn't match anything:
    else {
        readFile('error.html', 'utf8', function (errors, contents){
            response.writeHead(404, {'Content-Type': 'text/html'});  // send data about response
            response.end('File not found!!!');
        });
        
    }
});
server.listen(6543);
console.log("Running in localhost at port 6543");