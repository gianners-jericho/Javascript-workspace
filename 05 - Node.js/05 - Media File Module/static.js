// Flow: Request URL > Find the file > Read the file > Find its extension > Find its Content-Type > Send file to browser

const fs = require('fs');

// For getting all sorts of file extensions
const path = require('path');

// Mapping file extensions to proper content types through key-value pairs
const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg'
};

// For exporting the function
module.exports = function(request, response) {
    let filePath;

    if (request.url === '/') {
        // I am assuming index is the default file as per convention
        filePath = 'views/index.html'; 
    } else if (request.url.endsWith('.html')) {
        // Filepath for all html files in views
        filePath = 'views' + request.url;   
    } else {
        // For all other files that uese the url as their file path
        filePath = '.' + request.url;
    }

    // For reading the requested file
    fs.readFile(filePath, function(error, contents) {
        // If the file path does not exist, give 404 error
        if (error) {
            response.writeHead(404);
            response.end('File not found!');
            return;
        }

        // For getting the file extension
        let extension = path.extname(filePath);

        // Use the file extension to find the correct content type
        let contentType = contentTypes[extension];

        // To just use plain text if the file type is contentTypes
        if (!contentType) {
            contentType = 'text/plain';
        }

        // For telling the browser the request was successful and the file type it is receving
        response.writeHead(200, {
            'Content-Type': contentType
        });

        // For sending the contents of the file back to the browser
        response.end(contents);
    });
};