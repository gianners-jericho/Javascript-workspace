const express = require('express');
const session = require('express-session');
const axios = require('axios')
const path = require('node:path');

const app = express();
const port = 3000;

// Static Files

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: 'strong'
}))

app.use(express.urlencoded({ extended: true }));

const api = "https://api.coingecko.com/api/v3/"

async function fetchAPI(resource, page, per_page){
    // Query Params
    try {
        const result = await axios.get(`${api}${resource}`, {
            params: {
                "per_page": per_page ?? null,
                "page": page ?? null
            }
        })
    
        return result;
    }

    catch(err){
        return [];
    }
}

// Routes
app.get('/', function(req, res){
    res.redirect('/exchanges')
});

app.get('/exchanges', async function(req, res){   
    const result = await fetchAPI('exchanges', 1, 10)
    let names = [];
    for(let i = 0; i < result.data.length; i++){
        names.push(result.data[i].name)
    }

    res.render('exchanges', {dataSets:{
        exchanges: names
    }})
})

app.get('/platforms', async function(req, res){
    const result = await fetchAPI('asset_platforms')
    let names = [];
    let cutoff = result.data.slice(0,100)
    for(let i = 0; i < cutoff.length; i++){
        names.push(cutoff[i].name)
    }

    res.render('platforms', {dataSets:{
        exchanges: names
    }})
})

// API Routes
app.get('/api/exchanges', async function(req, res){
    const {per_page, page} = req.query;
    
    const result = await fetchAPI('exchanges', page, per_page)
    let names = [];
    for(let i = 0; i < result.data.length; i++){
        names.push(result.data[i].name)
    }
    return res.status(200).json({data: names})
})

app.get('/api/asset-platforms', async function(req, res){
    const {per_page, page} = req.query;
    
    const result = await fetchAPI('asset_platforms', page, per_page)

    let names = [];
    for(let i = 0; i < result.data.length; i++){
        names.push(result.data[i].name)
    }
    return res.status(200).json({data: names})
})

app.listen(port, function(){
    console.log(`Example app listening on port ${port}`);
});
