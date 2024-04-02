const productsModel = require('../models/productsModel');
const { CustomException } = require('../exceptions/CustomException');

const listProductModel = async () => {
  const result = await productsModel.listProducts();
  return result;
};

const listProductModelPerID = async (id) => {
  const [result] = await productsModel.listProductPerID(id);
  if (result.length === 0) throw new CustomException('NotFoundError', 'Product not found');
  return result;
};

const insertProductModel = async (product) => {
  if (!product.name) {
    throw new CustomException(
      'ValidationError',
      '"name" is required',
    );
  }
  if (product.name.length <= 5) {
    throw new CustomException(
      'UnprocessableEntity',
      '"name" length must be at least 5 characters long',
    );
  }
  const result = await productsModel.insertProducts(product);
  return result;
};

const updateProductModel = async (id, product) => {
  if (!product.name) { throw new CustomException('ValidationError', '"name" is required'); }
  if (product.name.length <= 5) {
    throw new CustomException(
      'UnprocessableEntity',
      '"name" length must be at least 5 characters long',
    ); 
  }
  if (![1, 2, 3].includes(Number(id))) {
    throw new CustomException('NotFoundError', 'Product not found');
  }
  const result = await productsModel.updateProducts(id, product);
  return result;
};

const deleteProductModel = async (id) => {
  if (![1, 2, 3].includes(Number(id))) {
    throw new CustomException('NotFoundError', 'Product not found');
  }
  await productsModel.deleteProduct(id);
};

module.exports = {
  listProductModel,
  listProductModelPerID,
  insertProductModel,
  updateProductModel,
  deleteProductModel,
};