const productsModel = require('../models/products.model')

class DashboardController {
    async viewDashboard(req, res) {
        const products = await productsModel.findAll();

        let result = []
        for(let i = 0; i < products.length; i++){
            const p = products[i]
            result.push({product_id: p.product_id, quantity: p.quantity, name: p.name});
        }
        res.render('products', {products: result});
    }
}

module.exports = new DashboardController;