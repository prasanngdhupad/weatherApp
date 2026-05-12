import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { History } from 'lucide-react';
import { motion } from 'framer-motion';

function SearchHistory({ onSelectCity }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/weather/history');
        setHistory(data);
      } catch (error) {
        console.error('Failed to fetch history', error);
      }
    };
    
    if (localStorage.getItem('token')) {
      fetchHistory();
    }
  }, []);

  if (history.length === 0) return null;

  return (
    <div className="mt-8 glass p-6 rounded-3xl">
      <div className="flex items-center space-x-2 mb-4">
        <History className="text-blue-500" />
        <h3 className="text-xl font-bold">Recent Searches (Saved)</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {history.map((item, index) => (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            key={item._id || index}
            onClick={() => onSelectCity(item.city)}
            className="cursor-pointer bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-white/10 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-full text-sm flex items-center space-x-2 transition"
          >
            <span className="font-semibold">{item.city}</span>
            <span className="opacity-70 text-xs">{Math.round(item.temperature)}°C</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;
