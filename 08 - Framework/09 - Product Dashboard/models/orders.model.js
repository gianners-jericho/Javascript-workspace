const db = require('../db');

class OrdersClass {
    async findAll(){
        const rows = await db.promise().query(`
            SELECT 
                o.*, p.name, u.name 
            FROM orders o
            JOIN users u ON u.user_id = o.user_id
            JOIN products p ON p.product_id = o.product_id 
        `)
        return rows[0];
    }

    async hasOrdered(id){
        const row = await db.promise().query(`SELECT o.* FROM orders o WHERE o.user_id = ? ORDER BY o.order_id LIMIT 1`, [id])
        return row[0] || null
    }
}

module.exports = new OrdersClass;