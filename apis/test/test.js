// tests/product.test.js

const mongoose = require('mongoose');

const dbHandler = require('./db-handler');
const productService = require('../schemas/todo-schema');
const todoSchema = require('../schemas/product');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * Product test suite.
 */
describe('todo ', () => {

    /**
     * Tests that a valid product can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        expect(async () => await productService.create(toDoComplete))
            .not
            .toThrow();
    });

    /**
     * Product should exist after being created.
     */
     it('exists after being created', async () => {
        await productService.create(toDoComplete);

        const createdProduct = await todoSchema.findOne();

        expect(createdProduct.id)
            .toBe(toDoComplete.id);
    });

    /**
     * Should throw an error when product doesn't have a name or price.
     */
    it('requires id and content', async () => {
        await expect(productService.create(productMissingId))
            .rejects
            .toThrow(mongoose.Error.ValidationError);

        await expect(productService.create(productMissingContent))
            .rejects
            .toThrow(mongoose.Error.ValidationError);
    });

});

/**
 * Complete product example.
 */
const toDoComplete = {
    id: {string: 'a123456789b123456789c123456789de', required: true},
    content: {string: "TestName", required: true}
};