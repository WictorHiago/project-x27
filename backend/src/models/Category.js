const fs = require('fs');
const path = require('path');

class Category {
    constructor() {
        this.dbPath = path.join(__dirname, '../database/categories.json');
    }

    getAll() {
        const data = JSON.parse(fs.readFileSync(this.dbPath));
        return data.data;
    }

    getById(id) {
        const categories = this.getAll();
        return categories.find(cat => cat.id === id);
    }

    create(categoryData) {
        const categories = this.getAll();
        const newCategory = {
            id: Date.now().toString(),
            name: categoryData.name,
            description: categoryData.description,
            createdAt: new Date().toISOString()
        };
        
        categories.push(newCategory);
        fs.writeFileSync(this.dbPath, JSON.stringify({ data: categories }));
        return newCategory;
    }

    update(id, categoryData) {
        const categories = this.getAll();
        const index = categories.findIndex(cat => cat.id === id);
        
        if (index === -1) return null;

        categories[index] = {
            ...categories[index],
            ...categoryData,
            updatedAt: new Date().toISOString()
        };

        fs.writeFileSync(this.dbPath, JSON.stringify({ data: categories }));
        return categories[index];
    }

    delete(id) {
        const categories = this.getAll();
        const filteredCategories = categories.filter(cat => cat.id !== id);
        
        if (filteredCategories.length === categories.length) return false;
        
        fs.writeFileSync(this.dbPath, JSON.stringify({ data: filteredCategories }));
        return true;
    }
}

module.exports = new Category();
