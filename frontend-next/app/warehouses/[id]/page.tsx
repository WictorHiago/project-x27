'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Warehouse {
  id?: string;
  name: string;
  location: string;
  capacity: number;
}

export default function WarehousePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === 'new';
  
  const [warehouse, setWarehouse] = useState<Warehouse>({
    name: '',
    location: '',
    capacity: 0
  });
  
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      fetchWarehouse();
    }
  }, [isNew]);

  const fetchWarehouse = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/warehouses/${id}`);
      if (!response.ok) throw new Error('Failed to fetch warehouse');
      const data = await response.json();
      setWarehouse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching warehouse');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = isNew 
        ? 'http://localhost:3000/api/warehouses'
        : `http://localhost:3000/api/warehouses/${id}`;
        
      const response = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(warehouse),
      });

      if (!response.ok) throw new Error('Failed to save warehouse');
      
      router.push('/warehouses');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving warehouse');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setWarehouse(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        {isNew ? 'Create Warehouse' : 'Edit Warehouse'}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={warehouse.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={warehouse.location}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
            Capacity *
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={warehouse.capacity}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => router.push('/warehouses')}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
