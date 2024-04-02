const { expect, assert } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../src/services/salesService');
const { CustomException } = require('../../../src/exceptions/CustomException');
const salesController = require('../../../src/controllers/salesController');

describe('Service tests', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Not found sales', async function () {
    let error;
    try {
      await salesService.listSalesModelPerID(350);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an.instanceOf(CustomException);
    expect(error.name).to.equal('NotFoundError');
    expect(error.message).to.equal('Sale not found');
  });

  it('List sales', async function () {
    const sales = await salesService.listSalesModel();
    expect(sales).to.be.an('array');
    expect(sales.length).to.be.above(0);
  });

  it('Insert undefined productId', async function () {
    const dataSale = [
      {
        quantity: 1,
      },
    ];
    try {
      await salesService.insertSaleModel(dataSale);
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('ValidationError');
      expect(error.message).to.equal('"productId" is required');
    }
  });

  it('Insert negative quantity', async function () {
    const dataSale = [
      {
        productId: 1,
        quantity: -1,
      },
    ];
    try {
      await salesService.insertSaleModel(dataSale);
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('UnprocessableEntity');
      expect(error.message).to.equal('"quantity" must be greater than or equal to 1');
    }
  });

  it('Insert quantity equal 0', async function () {
    const dataSale = [
      {
        productId: 1,
        quantity: 0,
      },
    ];
    try {
      await salesService.insertSaleModel(dataSale);
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('UnprocessableEntity');
      expect(error.message).to.equal('"quantity" must be greater than or equal to 1');
    }
  });

  it('Insert quantity not number', async function () {
    const dataSale = [
      {
        productId: 1,
        quantity: 'andre',
      },
    ];
    try {
      await salesService.insertSaleModel(dataSale);
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('UnprocessableEntity');
      expect(error.message).to.equal('"quantity" must be greater than or equal to 1');
    }
  });

  it('Insert undefined quantity', async function () {
    const dataSale = [
      {
        productId: 1,
      },
    ];
    try {
      await salesService.insertSaleModel(dataSale);
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('ValidationError');
      expect(error.message).to.equal('"quantity" is required');
    }
  });

  it('Insert productId Invalid', async function () {
    const dataSale = [
      {
        productId: 18,
        quantity: 1,
      },
    ];
    try {
      await salesService.insertSaleModel(dataSale);
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('NotFoundError');
      expect(error.message).to.equal('Product not found');
    }
  });

  /* it('Insert productId Valid', async () => {
        const dataSale = [
            {
                "productId": 2,
                "quantity": 1
            }
        ];
        try {
            await salesService.insertSaleModel(dataSale);
        } catch (error) {
            expect(error).to.not.exist;
        }
    }); */

  it('Catch Next Error insertSale', async function () {
    sinon.stub(salesService, 'insertSaleModel').throws(new Error('Test error'));
    const req = {};
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
    await salesController.listSalesController(req, res, next);
    expect(next.called).to.equal(false);
  });

  it('Insert productId Valid', async function () {
    const dataSale = [
      {
        productId: 1,
        quantity: 2,
      },
    ];
    try {
      await salesService.insertSaleModel(dataSale);
    } catch (error) {
      assert.notExists(error);
    }
  });
});