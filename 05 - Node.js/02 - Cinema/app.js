// get the http module:
const http = require("http");
// fs module allows us to read and write content for responses!!
const fs = require("fs");
// creating a server using http module:
const server = http.createServer(function (request, response) {
  // see what URL the clients are requesting:
  console.log("client request URL: ", request.url);

  //Views
  if (request.url === "/movies") {
    fs.readFile("views/movies.html", "utf8", function (errors, contents) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(contents);
      response.end();
    });
  } else if (request.url === "/theaters") {
    fs.readFile("views/theaters.html", "utf8", function (errors, contents) {
      response.writeHead(200, { "Content-type": "text/html" });
      response.write(contents);
      response.end();
    });
  } else if (request.url === "/movies/new") {
    fs.readFile("views/new_movies.html", "utf8", function (errors, contents) {
      response.writeHead(200, { "Content-type": "text/html" });
      response.write(contents);
      response.end();
    });
  } 
  
  // Images
  else if (request.url === "/images/marvel_2.jpg") {
    fs.readFile("images/marvel_2.jpg", function (errors, contents) {
      response.writeHead(200, { "Content-Type": "image/jpeg" });
      response.write(contents);
      response.end();
    });
  } 
  
  else if (request.url === "/images/marvel_3.jpg") {
    fs.readFile("images/marvel_3.jpg", function (errors, contents) {
      response.writeHead(200, { "Content-Type": "image/jpeg" });
      response.write(contents);
      response.end();
    });
  }

  else if (request.url === "/images/smdt_cinema.jpg") {
    fs.readFile("images/smdt_cinema.jpg", function (errors, contents) {
      response.writeHead(200, { "Content-Type": "image/jpeg" });
      response.write(contents);
      response.end();
    });
  }
    
  else if (request.url === "/images/ayala_cinema.jpg") {
    fs.readFile("images/ayala_cinema.jpg", function (errors, contents) {
      response.writeHead(200, { "Content-Type": "image/jpeg" });
      response.write(contents);
      response.end();
    });
  }

  // CSS 
  else if (request.url === "/stylesheets/movies.css") {
    fs.readFile("stylesheets/movies.css", "utf-8", function (errors, contents) {
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(contents);
      response.end();
    });
  }

  else if (request.url === "/stylesheets/new_movies.css") {
    fs.readFile("stylesheets/new_movies.css", "utf-8", function (errors, contents) {
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(contents);
      response.end();
    });
  }

  else if (request.url === "/stylesheets/theaters.css") {
    fs.readFile("stylesheets/theaters.css", "utf-8", function (errors, contents) {
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(contents);
      response.end();
    });
  }

  // request didn't match anything:
  else {
    response.end("File not found!!!");
  }
});

// tell your server which port to run on
server.listen(7890);
// print to terminal window
console.log("Running in localhost at port 7890");
