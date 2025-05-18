const express = require('express');
const ProductController = require('../controller/ProductController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const router =  express.Router();

router.post('/create',AuthMiddleware, ProductController.create);
router.get('/all', ProductController.findAll);
router.get('/find-by-id/:id', ProductController.findById);
router.put('/update/:id',AuthMiddleware, ProductController.updateProduct);
router.delete('/delete-by-id/:id',AuthMiddleware, ProductController.deleteProduct);

module.exports = router;