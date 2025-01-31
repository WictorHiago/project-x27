'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DashboardData {
  totalProducts: number;
  totalCategories: number;
  totalWarehouses: number;
  recentProducts: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export default function Home() {
  const [data, setData] = useState<DashboardData>({
    totalProducts: 0,
    totalCategories: 0,
    totalWarehouses: 0,
    recentProducts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, categoriesRes, warehousesRes] = await Promise.all([
        fetch('http://localhost:3000/api/products'),
        fetch('http://localhost:3000/api/categories'),
        fetch('http://localhost:3000/api/warehouses')
      ]);

      if (!productsRes.ok || !categoriesRes.ok || !warehousesRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const products = await productsRes.json();
      const categories = await categoriesRes.json();
      const warehouses = await warehousesRes.json();

      const productsArray = Array.isArray(products) ? products : [];
      const categoriesArray = Array.isArray(categories) ? categories : [];
      const warehousesArray = Array.isArray(warehouses) ? warehouses : [];

      setData({
        totalProducts: productsArray.length,
        totalCategories: categoriesArray.length,
        totalWarehouses: warehousesArray.length,
        recentProducts: productsArray
          .filter(product => product && typeof product === 'object')
          .sort((a, b) => {
            const dateA = a.entryDate ? new Date(a.entryDate).getTime() : 0;
            const dateB = b.entryDate ? new Date(b.entryDate).getTime() : 0;
            return dateB - dateA;
          })
          .slice(0, 5)
          .map(product => ({
            id: product.id || '',
            name: product.name || '',
            quantity: typeof product.quantity === 'number' ? product.quantity : 0,
            price: typeof product.price === 'number' ? product.price : 0
          }))
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Products</h2>
          <p className="text-3xl font-bold text-blue-600">{data.totalProducts}</p>
          <Link href="/products" className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-block">
            View all products →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Categories</h2>
          <p className="text-3xl font-bold text-green-600">{data.totalCategories}</p>
          <Link href="/categories" className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-block">
            View all categories →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Warehouses</h2>
          <p className="text-3xl font-bold text-purple-600">{data.totalWarehouses}</p>
          <Link href="/warehouses" className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-block">
            View all warehouses →
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Products</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-right">Quantity</th>
                <th className="px-6 py-3 text-right">Price</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.recentProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4 text-right">{product.quantity}</td>
                  <td className="px-6 py-4 text-right">
                    ${formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {data.recentProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
