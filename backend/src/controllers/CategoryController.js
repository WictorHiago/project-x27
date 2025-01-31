const Category = require('../models/Category');

class CategoryController {
    async getAllCategories() {
        try {
            const categories = await Category.getAll();
            return categories;
        } catch (error) {
            throw error;
        }
    }

    async getCategoryById(id) {
        try {
            const category = await Category.getById(id);
            return category;
        } catch (error) {
            throw error;
        }
    }

    async createCategory(data) {
        try {
            const category = await Category.create(data);
            return category;
        } catch (error) {
            throw error;
        }
    }

    async updateCategory(id, data) {
        try {
            const category = await Category.update(id, data);
            return category;
        } catch (error) {
            throw error;
        }
    }

    async deleteCategory(id) {
        try {
            return await Category.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CategoryController;
