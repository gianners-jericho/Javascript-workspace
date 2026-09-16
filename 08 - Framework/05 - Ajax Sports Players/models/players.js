const Model = require("./Model");

class PlayersModel extends Model {

    // For finding players by name (partial match), gender(s), and sport(s).
    // gender and sports are expected to always be arrays. An empty array
    // means "nothing in this category was selected" so no player can
    // qualify, so we return no results without even hitting the database.
    async searchPlayers(filters) {
        const { name, gender, sports } = filters;

        if (gender.length === 0 || sports.length === 0) {
            return [];
        }

        let sql = `
            SELECT players.id, players.name, players.gender,
                   GROUP_CONCAT(DISTINCT sports.sport_name) AS sports
            FROM players
            JOIN player_sports ON player_sports.player_id = players.id
            JOIN sports ON sports.id = player_sports.sport_id
            WHERE 1 = 1
        `;

        const values = [];

        // Partial name match - "jo" will match "John" or "Joanna"
        if (name) {
            sql += " AND players.name LIKE ?";
            values.push(`%${name}%`);
        }

        const genderPlaceholders = gender.map(() => "?").join(", ");
        sql += ` AND players.gender IN (${genderPlaceholders})`;
        values.push(...gender);

        // Subquery so GROUP_CONCAT above still shows each player's
        // full sports list, not just the matched sport
        const sportPlaceholders = sports.map(() => "?").join(", ");
        sql += ` AND players.id IN (
            SELECT player_id FROM player_sports
            JOIN sports ON sports.id = player_sports.sport_id
            WHERE sports.sport_name IN (${sportPlaceholders})
        )`;
        values.push(...sports);

        sql += " GROUP BY players.id";

        return await this.query(sql, values);
    }

}

module.exports = PlayersModel;