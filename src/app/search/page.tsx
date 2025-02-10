'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query.length > 2) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  const fetchResults = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/search?query=${query}`);
      setResults(response.data as any[]);
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Search Products</h1>
      <div className="flex items-center justify-center gap-4 mb-6">
        <Input 
          type="text" 
          placeholder="Search for products..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          className="w-96 p-2 border border-gray-300 rounded-md"
        />
        <Button onClick={fetchResults} className="bg-blue-600 text-white px-4 py-2 rounded-md">
          <FaSearch />
        </Button>
      </div>

      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {results.map((item: any) => (
          <Link href={`/product/${item.id}`} key={item.id} className="border p-4 rounded-lg shadow-md">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
            <p className="text-gray-600">Rs. {item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
