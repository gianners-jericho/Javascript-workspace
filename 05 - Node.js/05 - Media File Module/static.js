const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DEFAULT_FOLDER = 'views';
const HOME_PAGE = 'index.html';

const CONTENT_TYPES = {
    '.html': 'text/html',
    '.css' : 'text/css',
    '.js'  : 'text/javascript',
    '.json': 'application/json',
    '.txt' : 'text/plain',
    '.png' : 'image/png',
    '.jpg' : 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif' : 'image/gif',
    '.svg' : 'image/svg+xml',
    '.ico' : 'image/x-icon',
    '.webp': 'image/webp',
    '.mp3' : 'audio/mpeg',
    '.mp4' : 'video/mp4',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

function findFile(url) {
    let requested = url.split('?')[0];

    if (requested === '/') {
        requested = '/' + DEFAULT_FOLDER + '/' + HOME_PAGE;
    }

    requested = decodeURIComponent(requested);

    const candidates = [
        path.join(ROOT, requested),
        path.join(ROOT, DEFAULT_FOLDER, requested)
    ];

    for (let i = 0; i < candidates.length; i++) {
        const filepath = candidates[i];

        if (!filepath.startsWith(ROOT + path.sep)) {
            continue;
        }

        if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
            return filepath;
        }
    }

    return false;
}

function findContentType(filepath) {
    const extension = path.extname(filepath).toLowerCase();
    return CONTENT_TYPES[extension] || 'application/octet-stream';
}

module.exports = function (request, response) {
    console.log('client request URL: ', request.url);

    const filepath = findFile(request.url);

    if (!filepath) {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end('<h1>404 - File not found!</h1><p>Sorry, that file is not on this server.</p>');
        return;
    }

    fs.readFile(filepath, function (errors, contents) {
        if (errors) {
            response.writeHead(500, {'Content-Type': 'text/html'});
            response.end('<h1>500 - We could not read that file!</h1>');
            return;
        }

        response.writeHead(200, {'Content-Type': findContentType(filepath)});
        response.end(contents);
    });
};
