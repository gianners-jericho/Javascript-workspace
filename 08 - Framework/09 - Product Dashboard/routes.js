const express = require('express');
const router = express.Router();

const userController = require('./controllers/users.controller');
const productController = require('./controllers/products.controller')

const { requireLogin, requireAdmin } = require('./middlewares/auth.middlewares');

// Admin 
const adminRouter = express.Router();
adminRouter.use(requireAdmin);
adminRouter.get('/dashboard', productController.viewDashboard);
adminRouter.post('/product', () => {});
adminRouter.patch('/product', () => {});

router.use('/admin', adminRouter);

router.use(requireLogin);
// Products
router.get('/products', productController.viewDashboard);
router.get('/products/:id', productController.viewProductDetails);

// Profile
router.get("/profile", () => {});
router.patch("/profile", () => {});

// Auth
router.get('/register', userController.viewRegister);
router.get('/login', userController.viewLogin);

router.post('/register', userController.postRegister);
router.post('/login', userController.postLogin);

// Home
router.get("/", function(req, res) { res.redirect('/products') } );

module.exports = router;