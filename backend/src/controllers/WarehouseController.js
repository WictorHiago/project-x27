const Warehouse = require('../models/Warehouse');

class WarehouseController {
    async getAllWarehouses() {
        try {
            const warehouses = await Warehouse.getAll();
            return warehouses;
        } catch (error) {
            throw error;
        }
    }

    async getWarehouseById(id) {
        try {
            const warehouse = await Warehouse.getById(id);
            return warehouse;
        } catch (error) {
            throw error;
        }
    }

    async createWarehouse(data) {
        try {
            const warehouse = await Warehouse.create(data);
            return warehouse;
        } catch (error) {
            throw error;
        }
    }

    async updateWarehouse(id, data) {
        try {
            const warehouse = await Warehouse.update(id, data);
            return warehouse;
        } catch (error) {
            throw error;
        }
    }

    async deleteWarehouse(id) {
        try {
            return await Warehouse.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = WarehouseController;
