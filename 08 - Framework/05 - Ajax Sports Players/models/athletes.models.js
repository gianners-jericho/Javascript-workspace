const db = require('../db')

function parametize(arr){
    const values = [];
    for(let i = 0; i < arr.length; i++){
        values.push('?')
    };
    return values.join(', ')
}

class AthleteModel {
    async findAll() {
        const result = await db.promise().query("SELECT a.*, s.name AS sport FROM athletes a JOIN sports s ON  a.sport_id = s.id");
        return result[0];
    }

    async findFilter(genders = [], sports = [], name = "") {
        const wheres = [];
        const params = [];

        if(genders.length > 0){
            wheres.push(`a.gender IN (${parametize(genders)})`)
            params.push(...genders);
        }

        if(sports.length > 0){
            wheres.push(`a.sport_id IN (${parametize(sports)})`);
            params.push(...sports);
        }

        if(name){
            wheres.push(`a.first_name LIKE '%${name}%' OR a.last_name LIKE '%${name}%'`);
            params.push(name, name);
        }

        let sql = `
            SELECT
                a.*,
                s.name AS sport
            FROM athletes a
            JOIN sports s ON a.sport_id = s.id
        `

        if (wheres.length > 0) {
            sql += ` WHERE ${wheres.join(' AND ')}`;
        }

        console.log(sql, params)

        const result = await db.promise().query(sql, params);
        return result[0];
    }
}

module.exports = new AthleteModel;