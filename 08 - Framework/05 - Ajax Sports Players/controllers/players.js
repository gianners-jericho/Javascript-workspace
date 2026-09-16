const PlayersModel = require("../models/players");
const playersModel = new PlayersModel();

// Searches for players
async function search(req, res) {
    const { name, gender } = req.query;

    // Sports arrives as a string if only one checkbox is checked,
    // an array if multiple are checked, or undefined if none are
    let sports = req.query.sports;
    if (sports && !Array.isArray(sports)) {
        sports = [sports];
    }

    const players = await playersModel.searchPlayers({ name, gender, sports });

    // Temporary check will switch to res.render("search", ...) 
    // once the view exists
    res.json(players);
}

module.exports = { search };