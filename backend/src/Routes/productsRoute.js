const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.listProductController);

router.get('/:id', productController.listProductControllerPerID);

router.post('/', productController.insertProductController);

router.put('/:id', productController.updateProductController);

router.delete('/:id', productController.deleteProductController);

module.exports = router;
