import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Resource } from '../types';
import { FileText, Download } from 'lucide-react';

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'All',
    'Mathematics II',
    'Statistics II',
    'Computational Thinking',
    'Study Materials'
  ];

  useEffect(() => {
    fetchResources();
  }, [selectedCategory]);

  async function fetchResources() {
    try {
      setLoading(true);
      let query = supabase.from('resources').select('*');
      
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query.order('title', { ascending: true });
      
      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Study Resources
      </h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category.toLowerCase())}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category.toLowerCase()
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {resource.title}
                </h2>
              </div>
              <div className="mb-4">
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  {resource.category}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {resource.type}
                </span>
              </div>
              <a
                href={resource.downloadUrl}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}