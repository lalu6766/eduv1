import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { supabase } from '../lib/supabaseClient';
import { Users, BookOpen, MessageSquare, Mail, Plus } from 'lucide-react';

export default function Admin() {
  const { isAdmin } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchData();
  }, [isAdmin, activeTab]);

  async function fetchData() {
    try {
      setLoading(true);
      let { data: result, error } = await supabase
        .from(activeTab)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(result || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const tabs = [
    { id: 'users', name: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'resources', name: 'Resources', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'forum_posts', name: 'Forum Posts', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'contact_messages', name: 'Messages', icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <button className="flex items-center px-4 py-2 bg-green-500 text-black rounded-full hover:bg-green-600 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add New
        </button>
      </div>

      <div className="bg-[#282828] rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-4 px-4" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-b-2 border-green-500 text-green-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    {data[0] &&
                      Object.keys(data[0]).map((key) => (
                        <th
                          key={key}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          {key}
                        </th>
                      ))}
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {data.map((item, index) => (
                    <tr key={index}>
                      {Object.values(item).map((value: any, i) => (
                        <td key={i} className="px-6 py-4 whitespace-nowrap text-gray-300">
                          {typeof value === 'boolean' ? value.toString() : value}
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-green-500 hover:text-green-400 mr-3">Edit</button>
                        <button className="text-red-500 hover:text-red-400">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}