//import player model
import PlayerModel from '../models/playerModel.js';

//utility to ensure array values from checkboxes
const toArray = (val) => {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
};

export class PlayerController {
    //renders initial search page with full player list
    static renderIndex = async (req, res, next) => {
        try {
            //fetch initial list of all players
            const players = await PlayerModel.search();
            res.render('index', { players });
        } catch (error) {
            next(error);
        }
    };

    //handles ajax search and returns json player data
    static search = async (req, res, next) => {
        try {
            //extract filter parameters from query (get) or body (post)
            const source = req.method === 'POST' ? req.body : req.query;
            const name = (source.name || '').trim();
            const genders = toArray(source.gender || source.genders);
            const sports = toArray(source.sport || source.sports);

            //query model with normalized filter values
            const players = await PlayerModel.search({ name, genders, sports });

            //respond with json data as best practice for api/ajax endpoints
            res.json({
                success: true,
                count: players.length,
                players,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default PlayerController;
