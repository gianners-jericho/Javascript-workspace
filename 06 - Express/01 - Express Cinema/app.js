const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

// Serve all static assets (HTML, CSS, images) from the 'static' directory
app.use(express.static(path.join(__dirname, 'static')));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

//time spent: 10mins