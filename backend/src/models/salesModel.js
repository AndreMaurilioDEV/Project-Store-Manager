const connection = require('../database/connection');

const listSales = () => connection.execute(
  'SELECT sales.id AS saleId, sales.date AS date, '
  + 'salesProducts.product_id AS productId, salesProducts.quantity '
  + 'FROM StoreManager.sales AS sales '
  + 'INNER JOIN StoreManager.sales_products AS salesProducts '
  + 'ON sales.id = salesProducts.sale_id',
);

const listSalesPerID = (id) => connection.execute(
  `SELECT sales.date AS date, salesProducts.product_id AS productId, salesProducts.quantity 
    FROM StoreManager.sales AS sales 
    INNER JOIN StoreManager.sales_products AS salesProducts 
    ON sales.id = ? AND sales.id = salesProducts.sale_id`, 
  [id],
);

/* const insertSales = async (salesData) => {
  const salesInsertResult = await connection.execute('INSERT INTO sales () VALUES ()');
  const saleId = salesInsertResult[0].insertId;
  const itemsSold = [];
  for (const sale of salesData) {
    const { productId } = sale;
    const { quantity } = sale;
    await connection.execute('INSERT INTO sales_products (sale_id, product_id, quantity)VALUES (?, ?, ?)', [saleId, productId, quantity]);
    itemsSold.push({ productId, quantity });
  }
  return { id: saleId, itemsSold };
}; */

/* const insertSales = async (salesData) => {
  const salesInsertResult = await connection.execute('INSERT INTO sales () VALUES ()');
  const saleId = salesInsertResult[0].insertId;
  const itemsSold = [];
  salesData.forEach(async (sale) => {
    const { productId, quantity } = sale;
    await connection.execute('INSERT INTO sales_products' 
    + '(sale_id, product_id, quantity)' 
    + ' VALUES (?, ?, ?)', [saleId, productId, quantity]);
    itemsSold.push({ productId, quantity });
  });
  return { id: saleId, itemsSold };
}; */

const insertSales = async (salesData) => {
  const salesInsertResult = await connection.execute('INSERT INTO sales () VALUES ()');
  const saleId = salesInsertResult[0].insertId;
  const itemsSold = [];
 
  await Promise.all(salesData.map(async (sale) => {
    const { productId, quantity } = sale;
    await connection.execute('INSERT INTO sales_products' 
     + '(sale_id, product_id, quantity)' 
     + ' VALUES (?, ?, ?)', [saleId, productId, quantity]);
    itemsSold.push({ productId, quantity });
  }));
 
  return { id: saleId, itemsSold };
};

/* const insertSales = async (salesData) => {
  const salesInsertResult = await connection.execute('INSERT INTO sales () VALUES ()');
  const saleId = salesInsertResult[0].insertId;
  const insertPromises = salesData.map(async (sale) => {
    const { productId, quantity } = sale;
    await connection.execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', [saleId, productId, quantity]);
    return { productId, quantity };
  });
  console.log(insertPromises);
  const itemsSold = await Promise.all(insertPromises);

  return { id: saleId, itemsSold };
}; */

module.exports = {
  listSales,
  listSalesPerID,
  insertSales,
};