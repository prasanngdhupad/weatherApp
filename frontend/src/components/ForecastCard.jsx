import React from 'react';
import { motion } from 'framer-motion';

function ForecastCard({ data }) {
  if (!data || !data.list) return null;

  // Group by day, getting one forecast per day (approx midday)
  const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {dailyData.map((day, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-4 rounded-2xl flex flex-col items-center justify-center text-center hover:scale-105 transition-transform"
          >
            <p className="font-semibold mb-2">{getDayName(day.dt_txt)}</p>
            <img 
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
              alt="Weather Icon" 
              className="w-16 h-16"
            />
            <p className="text-lg font-bold">{Math.round(day.main.temp)}°C</p>
            <p className="text-xs opacity-70 capitalize mt-1 border-t border-gray-400/30 pt-1 w-full">{day.weather[0].description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ForecastCard;
