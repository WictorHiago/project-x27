const Product = require('../models/Product');

class ProductController {
    constructor() {
        this.productModel = new Product();
    }

    async getAllProducts() {
        try {
            const products = await this.productModel.getAll();
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await this.productModel.getById(id);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async getProductsByCategory(categoryId) {
        try {
            const products = await this.productModel.getByCategoryId(categoryId);
            return products;
        } catch (error) {
            throw error;
        }
    }

    async createProduct(data) {
        try {
            const product = await this.productModel.create(data);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, data) {
        try {
            const product = await this.productModel.update(id, data);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            return await this.productModel.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductController;
