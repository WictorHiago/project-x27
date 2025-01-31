const express = require('express');
const CategoryController = require('../controllers/CategoryController');

const router = express.Router();
const controller = new CategoryController();

// Listar todas as categorias
router.get('/', async (req, res, next) => {
    try {
        const categories = await controller.getAllCategories();
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

// Obter uma categoria específica
router.get('/:id', async (req, res, next) => {
    try {
        const category = await controller.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        next(error);
    }
});

// Criar uma nova categoria
router.post('/', async (req, res, next) => {
    try {
        const category = await controller.createCategory(req.body);
        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
});

// Atualizar uma categoria
router.put('/:id', async (req, res, next) => {
    try {
        const category = await controller.updateCategory(req.params.id, req.body);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        next(error);
    }
});

// Deletar uma categoria
router.delete('/:id', async (req, res, next) => {
    try {
        const success = await controller.deleteCategory(req.params.id);
        if (!success) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
