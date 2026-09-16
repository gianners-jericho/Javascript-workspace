const PlayersModel = require("../models/players");
const playersModel = new PlayersModel();

const genderList = ["M", "F"];
const sportsList = ["Basketball", "Volleyball", "Baseball", "Soccer", "Football"];

async function search(req, res) {
    const { name } = req.query;

    // Tells us whether the form was actually submitted, or this is just the initial page load 
    const submitted = req.query.submitted !== undefined;

    let gender = req.query.gender;
    if (!gender) gender = [];
    if (!Array.isArray(gender)) gender = [gender];

    let sports = req.query.sports;
    if (!sports) sports = [];
    if (!Array.isArray(sports)) sports = [sports];

    // On first load (not submitted yet), default to everything checked
    // so the page opens showing all players, matching the wireframe
    if (!submitted) {
        gender = genderList;
        sports = sportsList;
    }

    const players = await playersModel.searchPlayers({ name, gender, sports });

    res.render("search", {
        players,
        genderList,
        sportsList,
        query: { name, gender, sports }
    });
}

module.exports = { search };