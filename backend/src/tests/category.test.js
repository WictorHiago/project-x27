const Category = require('../models/Category');
const fs = require('fs');
const path = require('path');

jest.mock('fs');

describe('Category Model', () => {
    const mockData = {
        data: [
            {
                id: '1',
                name: 'Eletrônicos',
                description: 'Produtos eletrônicos em geral',
                createdAt: '2025-01-31T14:00:00.000Z'
            }
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();
        fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
    });

    describe('getAll', () => {
        it('deve retornar todas as categorias', () => {
            const categories = Category.getAll();
            expect(categories).toEqual(mockData.data);
            expect(fs.readFileSync).toHaveBeenCalled();
        });

        it('deve retornar um array vazio quando não há categorias', () => {
            fs.readFileSync.mockReturnValueOnce(JSON.stringify({ data: [] }));
            const categories = Category.getAll();
            expect(categories).toEqual([]);
        });
    });

    describe('getById', () => {
        it('deve retornar uma categoria por ID', () => {
            const category = Category.getById('1');
            expect(category).toEqual(mockData.data[0]);
        });

        it('deve retornar undefined para ID inexistente', () => {
            const category = Category.getById('999');
            expect(category).toBeUndefined();
        });
    });

    describe('create', () => {
        it('deve criar uma nova categoria com dados válidos', () => {
            const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');
            const newCategory = {
                name: 'Móveis',
                description: 'Móveis para casa'
            };

            const created = Category.create(newCategory);
            
            expect(created.name).toBe(newCategory.name);
            expect(created.description).toBe(newCategory.description);
            expect(created.id).toBeDefined();
            expect(created.createdAt).toBeDefined();
            expect(writeFileSyncMock).toHaveBeenCalled();
        });

        it('deve criar uma categoria mesmo sem descrição', () => {
            const newCategory = {
                name: 'Móveis'
            };

            const created = Category.create(newCategory);
            
            expect(created.name).toBe(newCategory.name);
            expect(created.description).toBeUndefined();
        });
    });

    describe('update', () => {
        it('deve atualizar uma categoria existente', () => {
            const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');
            const updateData = {
                name: 'Eletrônicos Atualizados',
                description: 'Nova descrição'
            };

            const updated = Category.update('1', updateData);
            
            expect(updated.name).toBe(updateData.name);
            expect(updated.description).toBe(updateData.description);
            expect(updated.id).toBe('1');
            expect(updated.updatedAt).toBeDefined();
            expect(writeFileSyncMock).toHaveBeenCalled();
        });

        it('deve retornar null ao tentar atualizar categoria inexistente', () => {
            const updated = Category.update('999', { name: 'Teste' });
            expect(updated).toBeNull();
        });
    });

    describe('delete', () => {
        it('deve deletar uma categoria existente', () => {
            const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');
            const result = Category.delete('1');
            
            expect(result).toBe(true);
            expect(writeFileSyncMock).toHaveBeenCalled();
        });

        it('deve retornar false ao tentar deletar categoria inexistente', () => {
            const result = Category.delete('999');
            expect(result).toBe(false);
        });
    });
});
