const { expect, assert } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const productService = require('../../../src/services/productsServices');
const productController = require('../../../src/controllers/productController');

chai.use(chaiHttp);
describe('Controllers tests', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('List Products', async function () {
    const req = { params: { id: 1 } };
    const res = {};
    res.status = (status) => {
      res.status = status;
      return res;
    };
    res.json = (data) => {
      res.data = data;
      return res;
    };
    const next = () => {};
    await productController.listProductControllerPerID(req, res, next);
    expect(res.status).to.equal(200);
    expect(res.data).to.be.an('object');
    expect(res.data).to.have.property('id');
    expect(res.data).to.have.property('name');
  });

  it('Return products', async function () {
    const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    sinon.stub(productService, 'listProductModel').resolves([products]);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.listProductController(null, res, null);
    assert.isTrue(res.status.calledWith(200));
    assert.isTrue(res.json.calledWith(products));
  });

  it('Catch error', async function () {
    const req = { params: { id: 350 } };
    const res = {};
    res.status = (status) => {
      res.status = status;
      return res;
    };
    res.json = (data) => {
      res.data = data;
      return res;
    };
    let error;
    const next = (err) => {
      error = err;
    };
    await productController.listProductControllerPerID(req, res, next);
    expect(error).to.be.an('Error');
    expect(error.message).to.equal('Product not found');
  });

  it('Return post product', async function () {
    const req = { body: { 
      name: 'Controle', 
    } };
    const res = {};
    res.status = (status) => {
      expect(status).to.equal(201);
      res.status = status;
      return res;
    };
    res.json = (data) => {
      expect(data).to.have.property('name').to.equal(req.body.name);
      res.data = data;
      return res;
    };
    await productController.insertProductController(req, res);
  });

  it('Catch Error ListProducts', async function () {
    sinon.stub(productService, 'listProductModel').throws(new Error('Test error'));
    const req = {};
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
    await productController.listProductController(req, res, next);
    assert.isTrue(next.called);
  });

  it('Catch error Delete', async function () {
    const req = { params: { id: 9 } };
    const res = {};
    res.status = (status) => {
      res.status = status;
      return res;
    };
    res.json = (data) => {
      res.data = data;
      return res;
    };
    let error;
    const next = (err) => {
      error = err;
    };
    await productController.deleteProductController(req, res, next);
    expect(error).to.be.an('Error');
    expect(error.message).to.equal('Product not found');
  });
});