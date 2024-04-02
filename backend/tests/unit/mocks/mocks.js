const commonValues = {
  date: '2024-03-28T06:46:21.000Z',
};
  
const saleFirstID = [
  {
    ...commonValues,
    productId: 1,
    quantity: 5,
  },
  {
    ...commonValues,
    productId: 2,
    quantity: 10,
  },
];
  
const sales = [
  {
    saleId: 1,
    ...commonValues,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    ...commonValues,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    ...commonValues,
    productId: 3,
    quantity: 15,
  },
];
  
module.exports = {
  saleFirstID,
  sales,
};