const Product = require('../models/Product');
const Category = require('../models/Category');
const fs = require('fs');
const path = require('path');

jest.mock('fs');
jest.mock('../models/Category');

describe('Product Model', () => {
    const mockData = {
        data: [
            {
                id: '1',
                name: 'Smartphone XYZ',
                quantity: 10,
                price: 999.99,
                categoryId: '1',
                entryDate: '2025-01-31T14:00:00.000Z',
                createdAt: '2025-01-31T14:00:00.000Z'
            }
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();
        fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
        Category.getById.mockImplementation((id) => id === '1' ? { id: '1', name: 'Eletrônicos' } : undefined);
    });

    describe('getAll', () => {
        it('deve retornar todos os produtos', () => {
            const products = Product.getAll();
            expect(products).toEqual(mockData.data);
            expect(fs.readFileSync).toHaveBeenCalled();
        });

        it('deve retornar um array vazio quando não há produtos', () => {
            fs.readFileSync.mockReturnValueOnce(JSON.stringify({ data: [] }));
            const products = Product.getAll();
            expect(products).toEqual([]);
        });
    });

    describe('getById', () => {
        it('deve retornar um produto por ID', () => {
            const product = Product.getById('1');
            expect(product).toEqual(mockData.data[0]);
        });

        it('deve retornar undefined para ID inexistente', () => {
            const product = Product.getById('999');
            expect(product).toBeUndefined();
        });
    });

    describe('create', () => {
        it('deve criar um novo produto com dados válidos', () => {
            const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');
            const newProduct = {
                name: 'Novo Smartphone',
                quantity: 5,
                price: 799.99,
                categoryId: '1'
            };

            const created = Product.create(newProduct);
            
            expect(created.name).toBe(newProduct.name);
            expect(created.quantity).toBe(newProduct.quantity);
            expect(created.price).toBe(newProduct.price);
            expect(created.categoryId).toBe(newProduct.categoryId);
            expect(created.id).toBeDefined();
            expect(created.createdAt).toBeDefined();
            expect(created.entryDate).toBeDefined();
            expect(writeFileSyncMock).toHaveBeenCalled();
        });

        it('deve lançar erro ao criar produto com categoria inexistente', () => {
            const newProduct = {
                name: 'Produto Teste',
                quantity: 1,
                price: 100,
                categoryId: '999'
            };

            expect(() => {
                Product.create(newProduct);
            }).toThrow('Categoria não encontrada');
        });
    });

    describe('update', () => {
        it('deve atualizar um produto existente', () => {
            const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');
            const updateData = {
                name: 'Smartphone Atualizado',
                quantity: 15
            };

            const updated = Product.update('1', updateData);
            
            expect(updated.name).toBe(updateData.name);
            expect(updated.quantity).toBe(updateData.quantity);
            expect(updated.id).toBe('1');
            expect(updated.updatedAt).toBeDefined();
            expect(writeFileSyncMock).toHaveBeenCalled();
        });

        it('deve retornar null ao tentar atualizar produto inexistente', () => {
            const updated = Product.update('999', { name: 'Teste' });
            expect(updated).toBeNull();
        });

        it('deve lançar erro ao atualizar produto com categoria inexistente', () => {
            expect(() => {
                Product.update('1', { categoryId: '999' });
            }).toThrow('Categoria não encontrada');
        });
    });

    describe('delete', () => {
        it('deve deletar um produto existente', () => {
            const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');
            const result = Product.delete('1');
            
            expect(result).toBe(true);
            expect(writeFileSyncMock).toHaveBeenCalled();
        });

        it('deve retornar false ao tentar deletar produto inexistente', () => {
            const result = Product.delete('999');
            expect(result).toBe(false);
        });
    });

    describe('getByCategory', () => {
        it('deve retornar produtos de uma categoria específica', () => {
            const products = Product.getByCategory('1');
            expect(products).toEqual([mockData.data[0]]);
        });

        it('deve retornar array vazio quando não há produtos na categoria', () => {
            const products = Product.getByCategory('999');
            expect(products).toEqual([]);
        });
    });
});
