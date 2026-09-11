/*idea:
1.) render feedback form showing the necessary fields
2.) have filled up form submit
3.) when submitted, render /result (result.ejs I think) to show the submitted data */

const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true })); // to parse the submitted data from req.body
app.use(session({
    secret: 'feedback-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//step 1
app.get('/', (req, res) => {
    res.render('index');
});

//step 2
app.post('/result', (req, res) => {
    req.session.feedback = req.body; //stores the fields from the form
    res.redirect('/result');
});

//step 3
app.get('/result', (req, res) => {
    const feedback = req.session.feedback || {};
    res.render('result', { feedback });
})

app.listen(PORT, () => {
    console.log(`Feedback Form Server running on http://localhost:${PORT}`);
});

//time spent: 30mins