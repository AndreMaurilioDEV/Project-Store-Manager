const express = require('express');

const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/', salesController.listSalesController);

router.get('/:id', salesController.listSalesControllerPerID);

router.post('/', salesController.insertSaleController);

module.exports = router;