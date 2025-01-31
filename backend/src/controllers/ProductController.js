const Product = require('../models/Product');

class ProductController {
    async getAllProducts() {
        try {
            const products = await Product.getAll();
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await Product.getById(id);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async getProductsByCategory(categoryId) {
        try {
            const products = await Product.getByCategoryId(categoryId);
            return products;
        } catch (error) {
            throw error;
        }
    }

    async createProduct(data) {
        try {
            const product = await Product.create(data);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, data) {
        try {
            const product = await Product.update(id, data);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            return await Product.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductController;
