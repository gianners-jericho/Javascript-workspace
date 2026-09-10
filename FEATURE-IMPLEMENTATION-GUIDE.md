# Feature Implementation Guide: Media File Module

## Overview
This guide details the implementation of a reusable, dynamic static file serving module (`static.js`) invoked by `app.js`. This module dynamically resolves incoming URLs, determines correct MIME headers, serves both text and binary static assets (HTML, CSS, images), and returns a 404 response for non-existent files.

---

## Directory Structure
All changes are contained inside the `05 - Node.js/05 - Media File Module` directory:

```
05 - Node.js/05 - Media File Module/
├── app.js
├── static.js
├── views/
│   ├── index.html
│   └── profile.html
├── stylesheets/
│   └── style.css
└── images/
    └── (optional image assets)
```

---

## Step 1: Create Static Test Assets

### 1.1 `05 - Node.js/05 - Media File Module/views/index.html`
**Status:** Create new file  
**File Path:** `05 - Node.js/05 - Media File Module/views/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Media File Module - Index</title>
  <link rel="stylesheet" href="/stylesheets/style.css">
</head>
<body>
  <h1>Welcome to the Index Page</h1>
  <p>Static file module served this HTML file successfully.</p>
  <a href="/profile.html">Go to Profile</a>
</body>
</html>
```

#### Technical Explanation
- Standard HTML document containing a `<link>` pointing to `/stylesheets/style.css` and an `<a>` link pointing to `/profile.html`.
- Serves as the default payload when incoming requests hit the root path (`/`).

---

### 1.2 `05 - Node.js/05 - Media File Module/views/profile.html`
**Status:** Create new file  
**File Path:** `05 - Node.js/05 - Media File Module/views/profile.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>User Profile</title>
  <link rel="stylesheet" href="/stylesheets/style.css">
</head>
<body>
  <h1>User Profile</h1>
  <p>This HTML view was served dynamically from the views directory.</p>
  <a href="/">Back to Index</a>
</body>
</html>
```

#### Technical Explanation
- Demonstrates URL-to-view mapping where `/profile.html` resolves dynamically to `views/profile.html`.

---

### 1.3 `05 - Node.js/05 - Media File Module/stylesheets/style.css`
**Status:** Create new file  
**File Path:** `05 - Node.js/05 - Media File Module/stylesheets/style.css`

```css
body {
  font-family: Arial, sans-serif;
  margin: 2rem;
  background-color: #f4f4f9;
  color: #333;
}

h1 {
  color: #1a73e8;
}

a {
  color: #d93025;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

#### Technical Explanation
- Provides static CSS styling to verify that `.css` files receive the `text/css` MIME type header and render properly in the browser.

---

## Step 2: Implement Dynamic Static File Module (`static.js`)

**Status:** Create new file  
**File Path:** `05 - Node.js/05 - Media File Module/static.js`

```javascript
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

module.exports = function (request, response) {
  let relativePath;

  if (request.url === '/') {
    relativePath = 'views/index.html';
  } else if (path.extname(request.url) === '.html' && !request.url.startsWith('/views/')) {
    relativePath = path.join('views', request.url);
  } else {
    relativePath = request.url.startsWith('/') ? request.url.slice(1) : request.url;
  }

  const extension = path.extname(relativePath).toLowerCase();
  const contentType = MIME_TYPES[extension] || 'text/plain';

  fs.readFile(relativePath, function (error, contents) {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('File not found!!!');
      return;
    }

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(contents);
  });
};
```

#### Technical Explanation
1. **Module Export**:
   - Uses `module.exports = function (request, response)` matching the signature required by `app.js`: `static_contents(request, response)`.
2. **Dynamic Path Resolution**:
   - `request.url === '/'`: Maps root requests directly to `views/index.html`.
   - `path.extname(request.url) === '.html' && !request.url.startsWith('/views/')`: Routes top-level HTML requests (e.g. `/profile.html`) directly into the `views/` directory (`views/profile.html`).
   - `else`: Strips the leading slash (`/stylesheets/style.css` -> `stylesheets/style.css`, `/images/cat.jpg` -> `images/cat.jpg`) to resolve relative to the server execution directory.
3. **MIME Type Mapping**:
   - `path.extname(relativePath).toLowerCase()` extracts the file extension.
   - `MIME_TYPES[extension] || 'text/plain'` looks up the appropriate `Content-Type` header (e.g., `text/html`, `text/css`, `image/jpeg`).
4. **Binary & Text Compatibility**:
   - `fs.readFile(relativePath, callback)` is called without an encoding parameter. This returns a raw `Buffer`, preserving binary image integrity while serving text files (HTML, CSS, JS) accurately.
5. **Error & 404 Handling**:
   - If `error` is returned by `fs.readFile` (e.g., `ENOENT` for non-existent files), the server sends HTTP status code `404`, headers `{'Content-Type': 'text/plain'}`, and writes `'File not found!!!'`.
   - Successful reads write HTTP status code `200`, the resolved `Content-Type`, and send the file contents using `response.end(contents)`.

---

## Step 3: Implement HTTP Server (`app.js`)

**Status:** Create new file  
**File Path:** `05 - Node.js/05 - Media File Module/app.js`

```javascript
// http server
const http = require('http');
const fs = require('fs');

// custom module to serve static content
const static_contents = require('./static.js');

// creating a server
const server = http.createServer(function (request, response) {
  static_contents(request, response); // this will serve all static files automatically
});

const PORT = 8920;
server.listen(PORT);
console.log(`Running in localhost at port ${PORT}`);
```

#### Technical Explanation
1. **Core Module Imports**:
   - Imports Node.js core `http` and `fs` modules.
2. **Custom Module Import**:
   - Imports `static_contents` via relative path `./static.js`.
3. **Server Initialization**:
   - Creates an HTTP server using `http.createServer(callback)`.
   - In each incoming request cycle, passes `request` and `response` objects to `static_contents(request, response)`.
4. **Port Binding**:
   - Binds the listener to port `8920` via `server.listen(8920)` and logs the active address to the terminal.

---

## Step 4: Verification and Testing

### 4.1 Running the Server
In a terminal, navigate to the target folder and execute:
```bash
cd "05 - Node.js/05 - Media File Module"
node app.js
```

### 4.2 Endpoint Verification Matrix
Test the server behavior against the following endpoints:

| Endpoint | Expected Status | Expected Content-Type | Result |
| :--- | :--- | :--- | :--- |
| `http://localhost:8920/` | `200` | `text/html` | Serves `views/index.html` |
| `http://localhost:8920/profile.html` | `200` | `text/html` | Serves `views/profile.html` |
| `http://localhost:8920/stylesheets/style.css` | `200` | `text/css` | Serves `stylesheets/style.css` |
| `http://localhost:8920/nonexistent.html` | `404` | `text/plain` | Outputs `File not found!!!` |
| `http://localhost:8920/images/missing.jpg` | `404` | `text/plain` | Outputs `File not found!!!` |

### 4.3 Curl Verification Commands
```bash
# 1. Root route (views/index.html)
curl -i http://localhost:8920/

# 2. Top-level HTML route (views/profile.html)
curl -i http://localhost:8920/profile.html

# 3. Stylesheet route
curl -i http://localhost:8920/stylesheets/style.css

# 4. 404 Not Found route
curl -i http://localhost:8920/random-file.txt
```
