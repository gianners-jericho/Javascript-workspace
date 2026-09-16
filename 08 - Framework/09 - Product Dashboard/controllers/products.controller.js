const productsModel = require('../models/products.model');
const reviewsModel = require('../models/reviews.model');
const ordersModel = require('../models/orders.model');

function nestReviews(reviews){
    const reviewMap = new Map();
    const roots = [];

    // init map
    for(let i = 0; i < reviews.length; i++){
        const review = reviews[i];
        reviewMap.set(review.review_id, {...review, replies: []});
    }

    for(let i = 0; i < reviews.length; i++){
        const review = reviews[i];
        const current = reviewMap.get(review.review_id);

        if(review.parent_review_id == null){
            roots.push(current);
        }
        else {
            const parent = reviewMap.get(review.parent_review_id);
            if(parent){
                parent.replies.push(current);
            }
        }
    }

    return roots;
}

class ProductsController {
    async viewDashboard(req, res) {
        const products = await productsModel.findAll();

        let result = [];
        for(let i = 0; i < products.length; i++){
            const p = products[i];
            result.push({product_id: p.product_id, quantity: p.quantity, name: p.name});
        }
        res.render('products', {products: result});
    }

    async viewProductDetails(req, res) {
        const { id } = req.params;
        const userId = req.session.user.user_id;

        const product = await productsModel.find(id);
        const reviews = await reviewsModel.getAllFromProductId(id);

        // process nesting
        const nested = nestReviews(reviews);

        // get avg rating
        let total = 0;
        for(let i = 0; i < reviews.length; i++){
            total += reviews[i].rating;
        };
        const avg = total / reviews.length;

        // check if ordered before
        const hasOrdered = (await ordersModel.hasOrdered(userId)).order_id ? true : false;

        res.render('product-details', {product: product, hasOrdered: hasOrdered, averageRating: avg, reviews: nested});
    }
}

module.exports = new ProductsController;