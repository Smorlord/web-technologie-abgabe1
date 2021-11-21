// src/services/product.js

const schema = require('../schemas/todo-schema');

/**
 * Stores a new todo into the database.
 * @param {Object} todo product object to create.
 * @throws {Error} If the product is not provided.
 */
module.exports.create = async (todo) => {
    if (!todo)
        throw new Error('Missing todo');

    await schema.create(todoSchema);
}