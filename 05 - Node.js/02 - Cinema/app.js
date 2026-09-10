const http = require('http');
const fs = require('fs');

const server = http.createServer(function (request, response){

    const routes = {
        "/": "views/index.html",
        "/movies": "views/movies.html",
        "/movies/new": "views/form.html",
        "/theaters": "views/theaters.html",
        "/images/movies/avengers.jpeg": "images/movies/avengers.jpeg",
        "/images/movies/batman.png": "images/movies/batman.png",
        "/images/movies/silence_of_the_lambs.jpg": "images/movies/silence_of_the_lambs.jpg",
        "/images/theaters/theater_1.jpg": "images/theaters/theater_1.jpg",
        "/images/theaters/theater_2.jpg": "images/theaters/theater_2.jpg",
        "/images/theaters/theater_3.jpg": "images/theaters/theater_3.jpg",
    }

    function respond(response, contentType, contents){
        response.writeHead(200, {'Content-Type': contentType});
        response.write(contents); 
        response.end();
    }

    const file = routes[request.url];
    if(file){
        if(request.url.includes("images")){
            fs.readFile(file, function (errors, contents){
                    respond(response, "image/*", contents)
            });
        }
        else {    
            const file = routes[request.url];
            fs.readFile(file, 'utf8', function (errors, contents){
                respond(response, "text/html", contents)
            });
        }
    }
    else {
        response.end('File not found!!!');
    }
});
server.listen(6789);
console.log("Running in localhost at port 6789");
