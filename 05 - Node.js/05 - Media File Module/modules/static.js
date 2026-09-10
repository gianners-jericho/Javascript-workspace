import { readFile } from 'fs';
import path from 'path';

export default function staticContents(request, response) {
    let filePath = '';
    let contentType = 'text/html';

    // 1. Root route
    if (request.url === '/') {
        filePath = 'views/index.html';
    } 
    // 2. Static CSS assets (/stylesheets/style.css -> stylesheets/style.css)
    else if (request.url.startsWith('/stylesheets/')) {
        filePath = request.url.substring(1);
        contentType = 'text/css';
    } 
    // 3. Static Image assets (/images/poster.jpg -> images/poster.jpg)
    else if (request.url.startsWith('/images/')) {
        filePath = request.url.substring(1);
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif'
        };
        contentType = mimeTypes[ext] || 'application/octet-stream';
    } 
    // 4. Fully Dynamic Views Catch-All
    else {
        // If request is /theaters -> reads views/theaters.html
        // If request is /movies/new -> reads views/movies/new.html
        // If request is /profile.html -> reads views/profile.html
        filePath = request.url.endsWith('.html') 
            ? `views${request.url}` 
            : `views${request.url}.html`;
    }

    // Attempt to read the mapped file dynamically
    readFile(filePath, (error, contents) => {
        if (error) {
            // Render error page if file doesn't exist on disk
            return readFile('views/error.html', 'utf8', (errErr, errorContents) => {
                if (errErr) {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    return response.end('404 - File not found!!!');
                }
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end(errorContents);
            });
        }

        response.writeHead(200, { 'Content-Type': contentType });
        response.end(contents);
    });
}