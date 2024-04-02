const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/database/connection');
const salesModel = require('../../../src/models/salesModel');
const mocks = require('../mocks/mocks');

describe('Sales Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('List sales', async function () {
    sinon.stub(connection, 'execute').resolves(mocks.sales);
    const model = await salesModel.listSales();
    expect(model).to.be.deep.equal(mocks.sales);
  });

  it('List sales Per ID', async function () {
    sinon.stub(connection, 'execute').resolves(mocks.saleFirstID);
    const model = await salesModel.listSalesPerID(1);
    expect(model).to.be.equal(mocks.saleFirstID);
  });

  it('Id sale invalid', async function () {
    sinon.stub(connection, 'execute').resolves(mocks.saleFirstID);
    const model = await salesModel.listSalesPerID(85);
    expect(model).to.be.equal(mocks.saleFirstID);
  });

  it('Insert sale', async function () {
    const saleToInsert = [
      {
        productId: 1,
        quantity: 1,
      },
    ];

    const saleInsert = {
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
      ],
    };

    const insert = { insertId: 1 };
    sinon.stub(connection, 'execute').resolves([insert]);
    const model = await salesModel.insertSales(saleToInsert);
    expect(model).to.eql(saleInsert);
  });
});