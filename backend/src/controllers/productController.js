const productService = require('../services/productsServices');

const listProductController = async (_req, res, next) => {
  try {
    const [result] = await productService.listProductModel();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const listProductControllerPerID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [result] = await productService.listProductModelPerID(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const insertProductController = async (req, res, next) => {
  try {
    const result = await productService.insertProductModel(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateProductController = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const result = await productService.updateProductModel(id, { name });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteProductController = async (req, res, next) => {
  const { id } = req.params;
  try {
    await productService.deleteProductModel(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listProductController,
  listProductControllerPerID,
  insertProductController,
  updateProductController,
  deleteProductController,
};