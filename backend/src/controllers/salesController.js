const salesService = require('../services/salesService');

const listSalesController = async (_req, res, next) => {
  try {
    const [result] = await salesService.listSalesModel();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const listSalesControllerPerID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await salesService.listSalesModelPerID(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const insertSaleController = async (req, res, next) => {
  try {
    const result = await salesService.insertSaleModel(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listSalesController,
  listSalesControllerPerID,
  insertSaleController,
};