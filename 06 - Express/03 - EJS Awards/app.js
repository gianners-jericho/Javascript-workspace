const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));

// Main List Route
app.get('/', (req, res) => {
    res.render('awards');
});
app.get('/awards', (req, res) => {
    res.render('awards'); // Main grid page with links to specific routes
});

app.get('/awards/oscar', (req, res) => {
    res.render('details', {
        award: {
            title: "Academy Award for Best Picture",
            year: "2024",
            organization: "AMPAS",
            description: "Recognizing outstanding artistic and technical merit in the film industry.",
            image: "/images/oscar.jpg",
            keyCategories: [
                "Best Director",
                "Best Original Screenplay",
                "Best Cinematography",
                "Best Film Editing"
            ]
        }
    });
});

app.get('/awards/grammy', (req, res) => {
    res.render('details', {
        award: {
            title: "Grammy Award for Album of the Year",
            year: "2024",
            organization: "The Recording Academy",
            description: "Honoring artistic achievement, technical proficiency, and overall excellence in the music industry.",
            image: "/images/grammy.jpg",
            keyCategories: [
                "Record of the Year",
                "Song of the Year",
                "Best New Artist",
                "Producer of the Year"
            ]
        }
    });
});

app.get('/awards/palme', (req, res) => {
    res.render('details', {
        award: {
            title: "Cannes Film Festival",
            year: "2026",
            organization: "French Association of the Festival de Cannes",
            description: "The Cannes Film Festival is the world's most prestigious annual international film festival, held in Cannes, France.",
            image: "/images/palme.jpg",
            keyCategories: [
                "Palme d'Or",
                "Grand Prix",
                "Best Director (Prix de la mise en scène",
                "Jury Prize (Prix du Jury)"
            ]
        }
    });
});

app.listen(PORT, () => {
    console.log(`EJS Awards server running on http://localhost:${PORT}`);
});

//time spent: 15mins