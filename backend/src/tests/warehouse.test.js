const Warehouse = require('../models/Warehouse');
const fs = require('fs');
const path = require('path');

jest.mock('fs');

describe('Warehouse Model', () => {
    const mockData = {
        data: [
            {
                id: '1',
                name: 'Depósito Central',
                address: 'Rua Principal, 123',
                createdAt: '2025-01-31T14:00:00.000Z'
            }
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();
        fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
    });

    describe('getAll', () => {
        it('deve retornar todos os armazéns', () => {
            const warehouses = Warehouse.getAll();
            expect(warehouses).toEqual(mockData.data);
            expect(fs.readFileSync).toHaveBeenCalled();
        });

        it('deve retornar um array vazio quando não há armazéns', () => {
            fs.readFileSync.mockReturnValueOnce(JSON.stringify({ data: [] }));
            const warehouses = Warehouse.getAll();
            expect(warehouses).toEqual([]);
        });
    });

    describe('getById', () => {
        it('deve retornar um armazém por ID', () => {
            const warehouse = Warehouse.getById('1');
            expect(warehouse).toEqual(mockData.data[0]);
        });

        it('deve retornar undefined para ID inexistente', () => {
            const warehouse = Warehouse.getById('999');
            expect(warehouse).toBeUndefined();
        });
    });

    describe('create', () => {
        it('deve criar um novo armazém com dados válidos', () => {
            const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');
            const newWarehouse = {
                name: 'Depósito Sul',
                address: 'Av. Sul, 456'
            };

            const created = Warehouse.create(newWarehouse);
            
            expect(created.name).toBe(newWarehouse.name);
            expect(created.address).toBe(newWarehouse.address);
            expect(created.id).toBeDefined();
            expect(created.createdAt).toBeDefined();
            expect(writeFileSyncMock).toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it('deve atualizar um armazém existente', () => {
            const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');
            const updateData = {
                name: 'Depósito Central Atualizado',
                address: 'Nova Rua, 789'
            };

            const updated = Warehouse.update('1', updateData);
            
            expect(updated.name).toBe(updateData.name);
            expect(updated.address).toBe(updateData.address);
            expect(updated.id).toBe('1');
            expect(updated.updatedAt).toBeDefined();
            expect(writeFileSyncMock).toHaveBeenCalled();
        });

        it('deve retornar null ao tentar atualizar armazém inexistente', () => {
            const updated = Warehouse.update('999', { name: 'Teste' });
            expect(updated).toBeNull();
        });
    });

    describe('delete', () => {
        it('deve deletar um armazém existente', () => {
            const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');
            const result = Warehouse.delete('1');
            
            expect(result).toBe(true);
            expect(writeFileSyncMock).toHaveBeenCalled();
        });

        it('deve retornar false ao tentar deletar armazém inexistente', () => {
            const result = Warehouse.delete('999');
            expect(result).toBe(false);
        });
    });
});
