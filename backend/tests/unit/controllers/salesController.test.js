const { expect, assert } = require('chai');
const sinon = require('sinon');
const salesController = require('../../../src/controllers/salesController');
const saleService = require('../../../src/services/salesService');

describe('Controllers tests', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('List Sales', async function () {
    const req = {};
    const res = {};
    res.status = (status) => {
      res.status = status;
      return res;
    };
    res.json = (data) => {
      res.data = data;
      return res;
    };
    await salesController.listSalesController(req, res);
    expect(res.status).to.equal(200);
    expect(res.data[0]).to.have.property('saleId');
    expect(res.data[0]).to.have.property('date');
    expect(res.data[0]).to.have.property('productId');
    expect(res.data[0]).to.have.property('quantity');
  });

  it('Return post sales', async function () {
    const req = { body: 
            [
              {
                productId: 10,
                quantity: 1,
              },
              {
                productId: 12,
                quantity: 5,
              },
            ], 
    };
    const res = {};
    res.status = (status) => {
      expect(status).to.equal(201);
      res.status = status;
      return res;
    };
    res.json = (data) => {
      req.body.forEach((item, index) => {
        expect(data.itemsSold[index]).to.have.property('productId').to.equal(item.productId);
        expect(data.itemsSold[index]).to.have.property('quantity').to.equal(item.quantity);
      });
      res.data = data;
      return res;
    };
    const next = () => {};
    await salesController.insertSaleController(req, res, next);
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
    await salesController.listSalesControllerPerID(req, res, next);
    expect(error).to.be.an('Error');
    expect(error.message).to.equal('Sale not found');
  });

  it('Catch Next Error listSale', async function () {
    sinon.stub(saleService, 'listSalesModel').throws(new Error('Test error'));
    const req = {};
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
    await salesController.listSalesController(req, res, next);
    assert.isTrue(next.called);
  });
});