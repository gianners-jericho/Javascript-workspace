const fs = require('fs');

const typeMap = {
  'html': 'text/html',
  'css':  'text/css',
  'json': 'application/json',
  'png':  'image/png',
  'jpg':  'image/jpeg',
  'jpeg': 'image/jpeg',
  'gif':  'image/gif',
  'svg':  'image/svg+xml',
  'ico':  'image/x-icon',
  'txt':  'text/plain',
};

class StaticJS {
    constructor(request, response, folder = ""){
        this.request = request;
        this.response = response;
        this.folder = folder;
    }
    
    respond(contentType, contents){
        this.response.writeHead(200, {'Content-Type': contentType});
        this.response.end(contents);
    }

    respondError(errorCode = 404){
        this.response.writeHead(errorCode);
        this.response.end('An error occurred.');
    }
    
    main(){
        const self = this; // save "this" for callbacks
        // add folder path if specified
        const path = this.request.url == "/" ? `${this.folder}index.html` : `${this.folder}${this.request.url.slice(1)}`;
        const ext = path.split(".").pop();
        const contentType = typeMap[ext];
        const isText = contentType.startsWith('text/');

        fs.readFile(path, isText ? 'utf-8': null, function(error, contents){
            // return error if doesn't exist
            if(error){
                return self.respondError(404);
            }
            return self.respond(contentType, contents);
        })
    }
}

module.exports = function(request, response, folder){
    const instance = new StaticJS(request, response, folder);
    instance.main();
};