const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/database/connection');
const productModel = require('../../../src/models/productsModel');
const productController = require('../../../src/controllers/productController');

describe('Product Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('List products', async function () {
    const products = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
      {
        id: 3,
        name: 'Escudo do CapitÃ£o AmÃ©rica',
      },
    ];

    sinon.stub(connection, 'execute').resolves(products);
    const model = await productModel.listProducts();
    expect(model).to.be.deep.equal(products);
  });

  it('List products Per ID', async function () {
    const productFirstID = {
      id: 1,
      name: 'Martelo de Thor',
    };

    sinon.stub(connection, 'execute').resolves(productFirstID);
    const model = await productModel.listProductPerID(1);
    expect(model).to.be.equal(productFirstID);
  });

  it('Delete products Per ID', async function () {
    const deleteStub = sinon.stub(connection, 'execute').resolves();
    const req = { params: { id: 1 } };
    const res = { 
      sendStatus: sinon.stub(),
    };

    await productController.deleteProductController(req, res);
    expect(deleteStub.calledOnceWithExactly('DELETE FROM products WHERE id = ?', [1]));
    expect(res.sendStatus.calledOnceWithExactly(204)).to.equal(true);
  });

  it('should insert a product and return its id', async function () {
    const productToInsert = {
      name: 'Product Name',
    };
    const expectedResult = {
      id: 1, 
      name: 'Product Name',
    };
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await productModel.insertProducts(productToInsert);
    expect(result).to.deep.equal(expectedResult);
  });

  it('update product', async function () {
    const toUpdate = {
      id: 1,
      name: 'Martelo',
    };
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productModel.updateProducts(1, toUpdate);
    expect(result).to.deep.equal(toUpdate);
  });
});