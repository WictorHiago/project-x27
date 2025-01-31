const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();
const controller = new ProductController();

// Listar todos os produtos
router.get('/', async (req, res, next) => {
    try {
        const products = await controller.getAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

// Obter um produto específico
router.get('/:id', async (req, res, next) => {
    try {
        const product = await controller.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
});

// Criar um novo produto
router.post('/', async (req, res, next) => {
    try {
        const product = await controller.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
});

// Atualizar um produto
router.put('/:id', async (req, res, next) => {
    try {
        const product = await controller.updateProduct(req.params.id, req.body);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
});

// Deletar um produto
router.delete('/:id', async (req, res, next) => {
    try {
        const success = await controller.deleteProduct(req.params.id);
        if (!success) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

// Listar produtos por categoria
router.get('/category/:categoryId', async (req, res, next) => {
    try {
        const products = await controller.getProductsByCategory(req.params.categoryId);
        res.json(products);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
