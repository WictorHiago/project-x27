const express = require('express');
const WarehouseController = require('../controllers/WarehouseController');

const router = express.Router();
const controller = new WarehouseController();

// Listar todos os armazéns
router.get('/', async (req, res, next) => {
    try {
        const warehouses = await controller.getAllWarehouses();
        res.json(warehouses);
    } catch (error) {
        next(error);
    }
});

// Obter um armazém específico
router.get('/:id', async (req, res, next) => {
    try {
        const warehouse = await controller.getWarehouseById(req.params.id);
        if (!warehouse) {
            return res.status(404).json({ error: 'Warehouse not found' });
        }
        res.json(warehouse);
    } catch (error) {
        next(error);
    }
});

// Criar um novo armazém
router.post('/', async (req, res, next) => {
    try {
        const warehouse = await controller.createWarehouse(req.body);
        res.status(201).json(warehouse);
    } catch (error) {
        next(error);
    }
});

// Atualizar um armazém
router.put('/:id', async (req, res, next) => {
    try {
        const warehouse = await controller.updateWarehouse(req.params.id, req.body);
        if (!warehouse) {
            return res.status(404).json({ error: 'Warehouse not found' });
        }
        res.json(warehouse);
    } catch (error) {
        next(error);
    }
});

// Deletar um armazém
router.delete('/:id', async (req, res, next) => {
    try {
        const success = await controller.deleteWarehouse(req.params.id);
        if (!success) {
            return res.status(404).json({ error: 'Warehouse not found' });
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
