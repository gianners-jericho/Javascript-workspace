const { default: axios } = require('axios');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000

const exchangesURL = 'https://api.coingecko.com/api/v3/exchanges';
const platformsURL = 'https://api.coingecko.com/api/v3/asset_platforms';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));

//Get data by chunk
async function getData(source, page) {
    const start = (page - 1) * 10;

    if (source === 'exchanges') {
        const exchanges = await axios.get(exchangesURL + '?per_page=10&page=' + page);
        return exchanges.data;
    }
    if (source === 'platforms') {
        const platforms = await axios.get(platformsURL);
        return platforms.data.slice(start, start + 10);
    }
}

//Call itself to get the 100
async function getDataTop(source, data, page) {
    const ten = await getData(source, page);

    data = data.concat(ten);

    if (data.length >= 100 || ten.length < 10) {
        return data.slice(0, 100);
    }

    return getDataTop(source, data, page + 1);
}

//ROOT ROUTE
app.get('/', function(request, response) {
    response.render('index');
})

//EXCHANGES ROUTE
app.get("/exchanges", async function(request, response) {
    const page = parseInt(request.query.page) || 1;

    try {
        response.json(await getData('exchanges', page));
    } catch (error) {
        console.log(error.message);
        response.json([]);
    }
    
})

//PLATFORMS
app.get("/platforms", async function(request, response) {
    const page = parseInt(request.query.page) || 1;
    const start = (page - 1) * 10;

    try {
        response.json(await getData('platforms', page));

    } catch (error) {
        console.log(error.message);
        response.json([]);
    }
})

//TOP 100 ROUTES
app.get("/exchanges/top", async function(request, response) {
    try {
        response.json(await getDataTop('exchanges', [], 1));
    } catch (error) {
        console.log(error.message);
        response.json([]);
    }
})

app.get("/platforms/top", async function(request, response) {
    try {
        response.json(await getDataTop('platforms', [], 1));
    } catch (error) {
        console.log(error.message);
        response.json([]);
    }
})

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}.`);
})