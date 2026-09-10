import { createServer } from 'http';
import { readFile } from 'fs';
import path from 'path';

const PORT = 7890;

const server = createServer(function (request, response) {
    console.log('Client request URL: ', request.url);

    // 1. DYNAMIC STATIC FILES (CSS & Images)
    if (request.url.startsWith('/stylesheets/') || request.url.startsWith('/images/')) {
        // Build local file path
        const filePath = '.' + request.url;
        const ext = path.extname(filePath).toLowerCase();

        // Determine correct MIME Content-Type
        const mimeTypes = {
            '.css': 'text/css',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif'
        };

        const contentType = mimeTypes[ext] || 'application/octet-stream';

        // Read images as binary
        readFile(filePath, function (error, contents) {
            if (error) {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                return response.end('Asset not found');
            }
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(contents);
        });
        return; // Exit early after handling static asset
    }

    // 2. HTML VIEW ROUTING
    let viewFile = '';

    if (request.url === '/movies' || request.url === '/') {
        viewFile = 'views/movies.html';
    } else if (request.url === '/theaters') {
        viewFile = 'views/theaters.html';
    } else if (request.url === '/movies/new') {
        viewFile = 'views/new-movie.html';
    } else {
        // Catch-all 404
        return readFile('views/error.html', 'utf8', function (error, contents) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end(contents);
        });
    }

    // Read and serve the matched view file
    readFile(viewFile, 'utf8', function (error, contents) {
        if (error) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            return response.end('Server Error loading page');
        }
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(contents);
    });
});

server.listen(PORT, function () {
    console.log(`Server running at http://localhost:${PORT}/movies`);
});