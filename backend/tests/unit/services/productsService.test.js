const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../src/services/productsServices');
const productModel = require('../../../src/models/productsModel');
const { CustomException } = require('../../../src/exceptions/CustomException');

const errorMessageProduct = 'Product not found';
describe('Service tests', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Not found products', async function () {
    let error;
    try {
      await productService.listProductModelPerID(350);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an.instanceOf(CustomException);
    expect(error.name).to.equal('NotFoundError');
    expect(error.message).to.equal(errorMessageProduct);
  });

  it('Not found id product', async function () {
    let error;
    try {
      await productService.deleteProductModel(9);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an.instanceOf(CustomException);
    expect(error.name).to.equal('NotFoundError');
    expect(error.message).to.equal(errorMessageProduct);
  });

  it('Insert product with valid name', async function () {
    const product = { name: 'Valid Product Name' };
    const result = await productModel.insertProducts(product);
    expect(result).to.be.an('object');
  });

  it('Insert Service product with valid name', async function () {
    const product = { name: 'Valid Product Name' };
    const result = await productService.insertProductModel(product);
    expect(result).to.be.an('object');
  });

  it('Test error length product name', async function () {
    const product = { name: 'Prod' }; 
    try {
      await productModel.insertProducts(product);
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('UnprocessableEntity');
      expect(error.message).to.equal('"name" length must be at least 5 characters long');
    }
  });

  it('Test error length product name length 5', async function () {
    const product = { name: 'Produ' }; 
    try {
      await productModel.insertProducts(product);
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('UnprocessableEntity');
      expect(error.message).to.equal('"name" length must be at least 5 characters long');
    }
  });

  it('Test error product undefined', async function () {
    const product = { name: '' };
    try {
      await productModel.insertProducts(product);
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('ValidationError');
      expect(error.message).to.equal('"name" is required');
    }
  });

  it('Insert product with invalid name', async function () {
    const product = { name: '' };
    try {
      await productService.insertProductModel(product);
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('ValidationError');
      expect(error.message).to.equal('"name" is required');
    }
  });

  it('should return a list of products', async function () {
    const products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
      { id: 3, name: 'Product 3' },
    ];

    const listProductsStub = sinon.stub(productModel, 'listProducts').resolves(products);
    const result = await productService.listProductModel();
    expect(result).to.deep.equal(products);
    listProductsStub.restore();
  });

  it('Delete invalid ID', async function () {
    try {
      await productService.deleteProductModel(599);
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('NotFoundError');
      expect(error.message).to.equal(errorMessageProduct);
    }
  });

  it('Test error invalid product id', async function () {
    const product = { name: 'Valid Product Name' };
    try {
      await productService.updateProductModel(4, product);
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('NotFoundError');
      expect(error.message).to.equal(errorMessageProduct);
    }
  });

  it('Test error name product 5 caracteres', async function () {
    const product = { name: 'Valid' };
    try {
      await productService.updateProductModel(2, product);
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('UnprocessableEntity');
      expect(error.message).to.equal('"name" length must be at least 5 characters long');
    }
  });

  it('Test error invalid name product length', async function () {
    const product = { name: 'Vali' };
    try {
      await productService.updateProductModel(2, product);
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('UnprocessableEntity');
      expect(error.message).to.equal('"name" length must be at least 5 characters long');
    }
  });

  it('Test delete', async function () {
    const result = await productService.deleteProductModel(2);
    expect(result).to.equal(undefined);
  });

  it('Test delete (teste)', async function () {
    const idProduct = {
      id: 1,
      name: 'Martelo',
    };
    sinon.stub(productModel, 'listProductPerID').resolves(idProduct);
    sinon.stub(productModel, 'deleteProduct').resolves(1);
    const result = await productService.deleteProductModel(1);
    expect(result).to.equal(undefined);
  });

  it('Update product with invalid ID', async function () {
    const product = { name: 'New Product Name' };
    try {
      await productService.updateProductModel(999, product); // ID inválido
    } catch (error) {
      expect(error).to.be.instanceOf(CustomException);
      expect(error.name).to.equal('NotFoundError');
      expect(error.message).to.equal(errorMessageProduct);
    }
  });
});