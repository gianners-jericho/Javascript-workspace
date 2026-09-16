const Player = require('../models/playersModel');

const genderList = ['M', 'F'];

//Express sends one string for a single checked box and an array for many
function toArray(value) {
    if (!value) {
        return [];
    }

    return Array.isArray(value) ? value : [value];
}

class PlayersController {

    //GET: nothing lives here, send them to the search page
    index(request, response) {
        response.redirect('/search');
    }

    //GET: one route answers both, the whole page normally and only the cards for ajax
    async search(request, response) {
        const name = request.query.name || '';

        //Nothing is submitted on the first load, so every box starts checked
        const submitted = request.query.submitted !== undefined;

        try {
            const sportsList = await Player.allSports();

            const genders = submitted ? toArray(request.query.gender) : genderList;
            const sports = submitted ? toArray(request.query.sport) : sportsList;

            const players = await Player.search(name, genders, sports);

            //The ajax call only needs the cards, not the whole page
            if (request.query.ajax) {
                return response.render('partials/playerCards', {players: players});
            }

            response.render('search', {
                players: players,
                genderList: genderList,
                sportsList: sportsList,
                query: {name: name, genders: genders, sports: sports}
            });
        } catch (error) {
            console.log(error.message);
            response.status(500).send('Something went wrong.');
        }
    }
}

module.exports = new PlayersController();
