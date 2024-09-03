const salesModel = require('../models/salesModel');
const { CustomException } = require('../exceptions/CustomException');

const listSalesModel = async () => {
  const result = await salesModel.listSales();
  return result;
};

const listSalesModelPerID = async (id) => {
  const [rows] = await salesModel.listSalesPerID(id);
  if (rows.length === 0) throw new CustomException('NotFoundError', 'Sale not found');
  return rows;
};

const existProduct = (saleParemeter) => {
  if (!saleParemeter) {
    throw new CustomException('ValidationError', '"productId" is required');
  }
};

const existQuantity = (saleParemeter) => {
  if (saleParemeter === undefined || saleParemeter === null) {
    throw new CustomException('ValidationError', '"quantity" is required');
  }
};

const validateSale = (sale) => {
  existProduct(sale.productId);
  existQuantity(sale.quantity);
  const quantityNumber = parseInt(sale.quantity, 10);
  if (Number.isNaN(quantityNumber) || quantityNumber <= 0) {
    throw new CustomException(
      'UnprocessableEntity',
      '"quantity" must be greater than or equal to 1',
    );
  }
  if (![1, 2, 3].includes(sale.productId)) {
    throw new CustomException('NotFoundError', 'Product not found');
  }
};

const insertSaleModel = async (salesData) => {
  salesData.forEach(validateSale);
  const result = await salesModel.insertSales(salesData);
  return result;
};

module.exports = {
  listSalesModel,
  listSalesModelPerID,
  insertSaleModel,
};
