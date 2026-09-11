const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Renders initial page
app.get('/', (req, res) => {
    res.render('index');
});

// JSON API endpoint called by client-side JS
app.get('/api/data', async (req, res) => {
    try {
        const type = req.query.type || 'exchanges'; // 'exchanges' or 'asset_platforms'
        const page = req.query.page || 1;
        const perPage = 10;

        let apiUrl = '';
        if (type === 'exchanges') {
            apiUrl = `https://api.coingecko.com/api/v3/exchanges?per_page=${perPage}&page=${page}`;
        } else if (type === 'platforms') {
            apiUrl = `https://api.coingecko.com/api/v3/asset_platforms`;
        }

        const response = await axios.get(apiUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' } // Helps prevent rate-limiting
        });

        // Slice pagination locally if platform endpoint doesn't support query params
        let data = response.data;
        if (type === 'platforms') {
            const start = (page - 1) * perPage;
            data = data.slice(start, start + perPage);
        }

        res.json({ success: true, page: parseInt(page), data });
    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch data' });
    }
});

app.listen(8000, () => console.log('Crypto app running on http://localhost:8000'));
//time spent: 2hrs