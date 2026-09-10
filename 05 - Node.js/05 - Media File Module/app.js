import { createServer } from 'http';
import static_contents from './modules/static.js';
import StringLib from './modules/stringlib.js';

const PORT = 8920;
const stringLib = new StringLib();

console.log(stringLib.concat("Server ", "Initializing..."));

const server = createServer(function (request, response) {
    static_contents(request, response);
});

server.listen(PORT, function () {
    console.log(`Server running at http://localhost:${PORT}/movies`);
});