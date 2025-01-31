const fs = require('fs');
const path = require('path');

class Warehouse {
    constructor() {
        this.dbPath = path.join(__dirname, '../database/warehouses.json');
    }

    getAll() {
        const data = JSON.parse(fs.readFileSync(this.dbPath));
        return data.data;
    }

    getById(id) {
        const warehouses = this.getAll();
        return warehouses.find(w => w.id === id);
    }

    create(warehouseData) {
        const warehouses = this.getAll();
        const newWarehouse = {
            id: Date.now().toString(),
            name: warehouseData.name,
            address: warehouseData.address,
            createdAt: new Date().toISOString()
        };
        
        warehouses.push(newWarehouse);
        fs.writeFileSync(this.dbPath, JSON.stringify({ data: warehouses }));
        return newWarehouse;
    }

    update(id, warehouseData) {
        const warehouses = this.getAll();
        const index = warehouses.findIndex(w => w.id === id);
        
        if (index === -1) return null;

        warehouses[index] = {
            ...warehouses[index],
            ...warehouseData,
            updatedAt: new Date().toISOString()
        };

        fs.writeFileSync(this.dbPath, JSON.stringify({ data: warehouses }));
        return warehouses[index];
    }

    delete(id) {
        const warehouses = this.getAll();
        const filteredWarehouses = warehouses.filter(w => w.id !== id);
        
        if (filteredWarehouses.length === warehouses.length) return false;
        
        fs.writeFileSync(this.dbPath, JSON.stringify({ data: filteredWarehouses }));
        return true;
    }
}

module.exports = new Warehouse();
