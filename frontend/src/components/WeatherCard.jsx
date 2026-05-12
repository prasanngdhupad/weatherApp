import React from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sunset, Wind, Droplets, Gauge } from 'lucide-react';

function WeatherCard({ data }) {
  if (!data) return null;

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-6 rounded-3xl mt-6 relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-4xl font-bold mb-2">{data.name}, {data.sys.country}</h2>
          <p className="text-xl capitalize">{data.weather[0].description}</p>
          <div className="mt-4 text-6xl font-extrabold">{Math.round(data.main.temp)}°C</div>
        </div>
        
        <div className="flex flex-col items-center">
          <img 
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} 
            alt="Weather Icon" 
            className="w-32 h-32 object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200/20 dark:border-white/10 relative z-10">
        <div className="flex items-center space-x-2">
          <Droplets className="text-blue-400" />
          <div>
            <p className="text-sm opacity-70">Humidity</p>
            <p className="font-semibold">{data.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Wind className="text-teal-400" />
          <div>
            <p className="text-sm opacity-70">Wind Speed</p>
            <p className="font-semibold">{data.wind.speed} m/s</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Gauge className="text-purple-400" />
          <div>
            <p className="text-sm opacity-70">Pressure</p>
            <p className="font-semibold">{data.main.pressure} hPa</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Sunrise className="text-orange-400" />
          <div>
            <p className="text-sm opacity-70">Sunrise/Sunset</p>
            <p className="font-semibold">{formatTime(data.sys.sunrise)} / {formatTime(data.sys.sunset)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WeatherCard;
