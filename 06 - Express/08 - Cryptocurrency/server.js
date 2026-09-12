const express = require("express");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const url_base = "https://api.coingecko.com/api/v3";
const page_size = 10;
const top_count = 100;

// This is for toggling the use of local data or live api
// The reason this is here is because I was having rate limit 
// Issues with the live API. So I decided to paste the data
// Into json files in the data folder. 
const is_local_data = true; // I set it to true by default to use the data without limits

// A function for all axios calls so that everything can be in one place.
// No error handling in this function because it focuses on building url template
async function getFromCoinGecko(path, params) {
    const response = await axios.get(`${url_base}${path}`, { params: params });
    return response.data;
}

// A function for getting the cryptocurrency by building the url
// URL for Coins: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd
async function getCryptoPage(page) {

    // Checks if we are using local data or not
    if (is_local_data) {
        const all = require("./data/cryptocurrency.json");
        const start = (page - 1) * page_size;
        return all.slice(start, start + page_size);
    }

    return getFromCoinGecko("/coins/markets", {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: page_size,
        page: page
    });
}

// A function for getting the exchanges by building the url
// URL for Exchanges: https://api.coingecko.com/api/v3/exchanges
async function getExchangesPage(page) {

    // Checks if we are using local data or not
    if (is_local_data) {
        const all = require("./data/exchange.json");
        const start = (page - 1) * page_size;
        return all.slice(start, start + page_size);       
    }

    return getFromCoinGecko("/exchanges", {
        per_page: page_size,
        page: page
    });
}

// For platforms, since it does not support pages like the cryptocurrency and exchanges,
// I decided to just get them all and then slice them myself
let allPlatforms = null;

// For getting all platforms
async function getAllPlatforms() {

    // Checks if we are using local data or not
    if (is_local_data) {
        return require("./data/asset_platform.json");
    }
    
    if (allPlatforms === null) {
        allPlatforms = await getFromCoinGecko("/asset_platforms");
    }
    return allPlatforms;
}

// For slicing them into a page of 10
async function getPlatformsPage(page) {
    const all = await getAllPlatforms();
    const start = (page - 1) * page_size;
    return all.slice(start, start + page_size);
}

// This is the recursion for getting the top 100 results
// since page_size is set to 10 (ew.g. 1 page = 10 items), 
// it will recursively retrieve pages until the number of items is 100
// The getPageFunction is a callback to either the cryptocurrency, exchanges, 
// or platform functions.
async function getTop100(getPageFunction, page = 1, results = []){
    const items = await getPageFunction(page);
    const combined = results.concat(items);
    
    // Calculates how many pages needed (100 / 10)
    const pagesNeeded = top_count / page_size;
    if (page >= pagesNeeded || items.length === 0) {
        return combined;
    }

    return getTop100(getPageFunction, page + 1, combined);
}


// Routes for the cryptocurrency, exchanges, and platforms page
app.get("/", async function(req, res){
    try {
        const items = await getCryptoPage(1);
        res.render("index", { items: items });
    } catch (error) {
        console.log("Error loading the CryptoCurrency Page:", error.message);
        res.status(500).send("Could not load the CryptoCurrency data. Please try again.");
    }
});

app.get("/exchanges", async function(req, res) {
    try{
        const items = await getExchangesPage(1);
        res.render("exchange", { items: items });
    } catch (error) {
        console.log("Error loading the Exchanges Page:", error.message);
        res.status(500).send("Could not load the exchange data. Please try again.");
    }
});

app.get("/platforms", async function(req, res) {
    try{
        const items = await getPlatformsPage(1);
        res.render("platform", { items: items });
    } catch (error) {
        console.log("Error loading the Platforms Page:", error.message);
        res.status(500).send("Could not load the platform data. Please try again.");
    }
});
// Routes for the cryptocurrency, exchanges, and platforms page


// API routes called by the buttons through fetch
// First 10
app.get("/api/crypto", async function(req, res) {
    try {
        const page = Number(req.query.page) || 1;
        const items = await getCryptoPage(page);
        res.json(items);
    } catch (error) {
        console.log("Error in /api/crypto:", error.message);
        res.status(500).json({ error: "Could not load CryptoCurrency data" });
    }
});

// Top 100
app.get("/api/crypto/top100", async function (req, res) {
    try {
        const items = await getTop100(getCryptoPage);
        res.json(items);
    } catch (error) {
        console.log("Error in /api/crypto/top100:", error.message);
        res.status(500).json({ error: "Could not load cryptocurrency data" });
    }
});

// First 10
app.get("/api/exchanges", async function (req, res) {
    try {
        const page = Number(req.query.page) || 1;
        const items = await getExchangesPage(page);
        res.json(items);
    } catch (error) {
        console.log("Error in /api/exchanges:", error.message);
        res.status(500).json({ error: "Could not load exchange data" });
    }
});

// Top 100
app.get("/api/exchanges/top100", async function (req, res) {
    try {
        const items = await getTop100(getExchangesPage);
        res.json(items);
    } catch (error) {
        console.log("Error in /api/exchanges/top100:", error.message);
        res.status(500).json({ error: "Could not load exchange data" });
    }
});

// First 10
app.get("/api/platforms", async function (req, res) {
    try {
        const page = Number(req.query.page) || 1;
        const items = await getPlatformsPage(page);
        res.json(items);
    } catch (error) {
        console.log("Error in /api/platforms:", error.message);
        res.status(500).json({ error: "Could not load platform data" });
    }
});

// Top 100
app.get("/api/platforms/top100", async function (req, res) {
    try {
        const items = await getTop100(getPlatformsPage);
        res.json(items);
    } catch (error) {
        console.log("Error in /api/platforms/top100:", error.message);
        res.status(500).json({ error: "Could not load platform data" });
    }
});

const PORT = 8000;

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT} and live at http://localhost:${PORT}`);
});