const fs = require("fs");;
const PATH = require("path");

const CONTENT_TYPE_MAPPING = {
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.jpg':'image/jpeg',
    'png':'image/png',
    '.gif':'image/gif',
    '.svg':'image/svg+xml',
    '.ico':'image/x-icon',
};

module.exports = function(request, response){
    let path;

    if(request.url === "/"){
        path = 'views/index.html'
    }
    else if (path.extname(request.url) && !request.url.startsWutg('/views/')){
        path = PATH.join("views", request.url);
    }
    else{
        path = request.url.startsWith('/')? request.url.slice(1) : request.url;
    }

    const extension = path.extname(path).toLowerCase();
    const contentType = CONTENT_TYPE_MAPPING[extension] || 'text/plain';

    fs.readFile(relativePath, function(error, contents){
        if(error){
            response.writeHead(404, {'Content-Type':'text/plain'})
            response.end("File not found")
            return;
        }

        response.writeHead(200, {'Content-Type':contentType});
        response.end(contents);
    });
};