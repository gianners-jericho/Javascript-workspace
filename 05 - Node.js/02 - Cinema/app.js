const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = 7890;

function handleError(error, response){
    response.writeHead(500, {'Content-Type':'text/plain'})
    response.end("Internal server error")
}

const server = http.createServer(function (request, response){

        if(request.url === "/movies" && request.method === "GET"){
            //browser always executes a GET request to the endpoint in the page url on first load/refresh
            fs.readFile("./views/movies.html", function(error, contents){

                if(error){
                    handleError(error, response)
                }
                else{
                    response.writeHead(200, {'Content-Type':'text/html'});
                    response.write(contents);
                    response.end();
                }
            })
        }

        else if(request.url === "/theaters" && request.method === "GET"){
            fs.readFile("./views/theaters.html", function(error, contents){

                if(error){
                    handleError(error, response)
                }
                else{
                    response.writeHead(200, {'Content-Type':'text/html'});
                    response.write(contents);
                    response.end();
                }

            })
        }  

        else if (request.url === "/movies" && request.method === "POST") {

            //SAMPLE CODE - NO DB ACTUALLY SET UP - SIMULATES INTERCEPTING A POST REQUEST FROM A FORM THAT CONTAINS action="/movies" AND method="POST"
            //browser ignores page URL when submitting form, only looks at action attribute

            let body = "";

            request.on("data", function(chunk) {
                body += chunk.toString(); 
            });

            request.on("end", async function() {
                // 1. Parse the completed data stream
                const formData = new URLSearchParams(body);
                const title = formData.get("title");
                const director = formData.get("director");

                try {
                    // 2. THE DATABASE UPDATE HAPPENS HERE
                    // Await the asynchronous database query
                    await db.query(
                        "INSERT INTO movies (title, director) VALUES (?, ?)", 
                        [title, director]
                    );

                    // 3. Issue the redirect ONLY after the database confirms the save
                    response.writeHead(302, { 'Location': '/movies' });
                    return response.end();

                } catch (dbError) {
                    // 4. Handle database rejection (e.g., unique constraint failed)
                    console.error("Database insert failed:", dbError);
                    
                    // Redirect back to the form so the user can try again
                    response.writeHead(302, { 'Location': '/movies/new' });
                    return response.end();
                }
            });
        }

        else if (request.url === "/stylesheets/style.css"){
            fs.readFile("./stylesheets/style.css", function(error, contents){
                if(error){
                    handleError(error, response)
                }
                else{
                    response.writeHead(200, {'Content-Type': 'text/css'})
                    response.write(contents)
                    response.end()
                }

            })
        }

        else if(request.url === '/images/pizza.jpg'){
            fs.readFile("./images/pizza.jpg", function(error, contents){
                if(error){
                    handleError(error, response)
                }
                else{
                    response.writeHead(200, {'Content-Type': 'image/jpg'})
                    response.write(contents)
                    response.end()
                }

            })
        }

        else{
            response.writeHead(404, {'Content-Type': 'text/plain'})
            response.end("File not found")
        }

})

server.listen(PORT);