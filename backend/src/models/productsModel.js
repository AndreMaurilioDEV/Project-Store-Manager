const connection = require('../database/connection');

const listProducts = () => connection.execute('SELECT * FROM StoreManager.products');

const listProductPerID = (id) => connection.execute(
  'SELECT * FROM StoreManager.products WHERE id = ?', 
  [id],
);

const insertProducts = async (product) => {
  const query = 'INSERT INTO products (name) VALUES (?)';
  const values = [product.name];
  const result = await connection.execute(query, values);
  const { insertId } = result[0];
  return {
    id: insertId,
    ...product,
  };
};

const updateProducts = async (id, product) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  const values = [product.name, id];
  await connection.execute(query, values);
  const { name } = product;
  const idParse = parseInt(id, 10);
  return {
    id: idParse,
    name,
  };
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  const values = [id];
  await connection.execute(query, values);
};

module.exports = {
  listProducts,
  listProductPerID,
  insertProducts,
  updateProducts,
  deleteProduct,
};