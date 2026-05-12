import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import SearchHistory from '../components/SearchHistory';

function Home() {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentKey, setRecentKey] = useState(0);

  useEffect(() => {
    // Start with a blank page instead of fetching a default city
  }, []);

  const fetchWeather = async (city) => {
    if (!city) return;
    try {
      setLoading(true);
      const { data } = await api.get(`/weather/${city}`);
      setWeatherData(data.current);
      setForecastData(data.forecast);
      setQuery('');
      // Trigger a re-render/refetch of History component
      setRecentKey(prev => prev + 1);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch weather');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(query);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative mt-4">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..." 
          className="w-full glass pl-12 pr-4 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-xl bg-white/20 dark:bg-black/20"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50 h-6 w-6" />
        <button 
          type="submit" 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition font-semibold shadow-md"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="flex justify-center mt-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!loading && weatherData && (
        <>
          <WeatherCard data={weatherData} />
          <ForecastCard data={forecastData} />
        </>
      )}

      <SearchHistory onSelectCity={fetchWeather} key={recentKey} />
    </div>
  );
}

export default Home;
