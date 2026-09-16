const db = require('../db');

class ReviewsClass {
    async getAllFromProductId(id){
        const rows = await db.promise().query("SELECT r.*, u.name FROM reviews r JOIN users u ON u.user_id = r.user_id WHERE product_id = ?", [id]);
        return rows[0];
    }

    async postReview(product_id, content, user_id, parent_review_id){
        const row = await db.promise().query("INSERT INTO reviews (product_id, user_id, rating, content, parent_review_id) VALUES (?, ?, ?, ?, ?)", [product_id, content, user_id, parent_review_id]);
        return row ? true : false;
    }
}

module.exports = new ReviewsClass;