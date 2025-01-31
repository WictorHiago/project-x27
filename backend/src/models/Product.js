const fs = require('fs');
const path = require('path');
const CategoryModel = require('./Category');

class Product {
    constructor() {
        this.dbPath = path.join(__dirname, '../database/products.json');
        // Garantir que o arquivo existe
        if (!fs.existsSync(this.dbPath)) {
            fs.writeFileSync(this.dbPath, JSON.stringify({ data: [] }));
        }
    }

    getAll() {
        try {
            const data = JSON.parse(fs.readFileSync(this.dbPath));
            return data.data || [];
        } catch (error) {
            return [];
        }
    }

    getById(id) {
        try {
            const products = this.getAll();
            return products.find(prod => prod.id === id) || null;
        } catch (error) {
            return null;
        }
    }

    create(productData) {
        try {
            const products = this.getAll();
            
            // Verificar se a categoria existe
            const category = CategoryModel.getById(productData.categoryId);
            if (!category) {
                throw new Error('Categoria não encontrada');
            }

            const newProduct = {
                id: Date.now().toString(),
                name: productData.name,
                description: productData.description,
                quantity: parseInt(productData.quantity) || 0,
                price: parseFloat(productData.price) || 0,
                categoryId: productData.categoryId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            products.push(newProduct);
            fs.writeFileSync(this.dbPath, JSON.stringify({ data: products }));
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    update(id, productData) {
        try {
            const products = this.getAll();
            const index = products.findIndex(prod => prod.id === id);
            
            if (index === -1) return null;

            // Se estiver atualizando a categoria, verificar se existe
            if (productData.categoryId) {
                const category = CategoryModel.getById(productData.categoryId);
                if (!category) {
                    throw new Error('Categoria não encontrada');
                }
            }

            const updatedProduct = {
                ...products[index],
                ...productData,
                quantity: parseInt(productData.quantity) || products[index].quantity,
                price: parseFloat(productData.price) || products[index].price,
                updatedAt: new Date().toISOString()
            };

            products[index] = updatedProduct;
            fs.writeFileSync(this.dbPath, JSON.stringify({ data: products }));
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    delete(id) {
        try {
            const products = this.getAll();
            const filteredProducts = products.filter(prod => prod.id !== id);
            
            if (filteredProducts.length === products.length) {
                return false;
            }
            
            fs.writeFileSync(this.dbPath, JSON.stringify({ data: filteredProducts }));
            return true;
        } catch (error) {
            throw error;
        }
    }

    getByCategoryId(categoryId) {
        try {
            const products = this.getAll();
            return products.filter(prod => prod.categoryId === categoryId);
        } catch (error) {
            return [];
        }
    }
}

module.exports = Product;
