'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  categoryId: string;
  category?: {
    name: string;
  };
  entryDate?: string;
}

interface Category {
  id: string;
  name: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetchProducts(),
      fetchCategories()
    ]).catch(err => {
      setError(err instanceof Error ? err.message : 'Error fetching data');
      setLoading(false);
    });
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        cache: 'no-store' // Desabilita o cache para sempre buscar dados frescos
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      throw err;
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categories', {
        cache: 'no-store' // Desabilita o cache para sempre buscar dados frescos
      });
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete product');
      
      // Atualiza a lista de produtos após deletar
      await fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting product');
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Unknown';
  };

  const formatPrice = (price: number) => {
    return typeof price === 'number' ? `$${price.toFixed(2)}` : '$0.00';
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return '-';
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return '-';
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link 
          href="/products/new" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getCategoryName(product.categoryId)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatPrice(product.price)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(product.entryDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link 
                    href={`/products/${product.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900 ml-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
