const db = require('../db')

class ProductsModel {
    async find(id) {
        const row = await db.promise().query("SELECT * FROM products WHERE product_id = ?", [id])
        return row[0][0] || null;
    }

    async findAll() {
        const rows = await db.promise().query("SELECT * FROM products");
        return rows[0] || null;
    }

    async create(name, description, stock) {
        const row = await db.promise().query("INSERT INTO products (name, description, quantity) VALUES (?, ?, ?)", [name, description, stock])
        return row ? true : false;
    }

    async edit(id, value) {
        
    }
}

module.exports = new ProductsModel;