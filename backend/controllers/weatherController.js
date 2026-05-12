const axios = require('axios');
const SearchHistory = require('../models/SearchHistory');

exports.getWeather = async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    
    // MOCK DATA FALLBACK
    const mockFallback = () => {
      const current = {
        name: city.toUpperCase() + " (Preview Mode)",
        sys: { country: "DEMO", sunrise: Math.floor(Date.now()/1000) - 21600, sunset: Math.floor(Date.now()/1000) + 21600 },
        weather: [{ main: "Clear", description: "demo clear sky", icon: "01d" }],
        main: { temp: 24, humidity: 55, pressure: 1015 },
        wind: { speed: 3.2 }
      };
      const forecast = { list: [] };
      for(let i=1; i<=5; i++) {
        const d = new Date(); d.setDate(d.getDate() + i);
        forecast.list.push({
          dt_txt: d.toISOString().split('T')[0] + ' 12:00:00',
          main: { temp: 22 + Math.random() * 5 },
          weather: [{ main: "Clouds", description: "demo clouds", icon: "02d" }]
        });
      }
      return { current, forecast };
    };

    if (!apiKey || apiKey === 'your_openweathermap_api_key_here') {
      return res.json(mockFallback());
    }

    // Fetch Current Weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const weatherRes = await axios.get(weatherUrl);
    
    // Fetch 5-Day Forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const forecastRes = await axios.get(forecastUrl);

    // Save Search History
    if (req.user) {
      const history = new SearchHistory({
        user: req.user,
        city: weatherRes.data.name,
        temperature: weatherRes.data.main.temp,
        weather_condition: weatherRes.data.weather[0].main
      });
      await history.save();
    }

    res.json({
      current: weatherRes.data,
      forecast: forecastRes.data
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'City not found' });
    }
    if (error.response && error.response.status === 401) {
      // API Key invalid, return mock data payload
      const mockResult = {
        current: {
          name: req.params.city + " (Invalid API Key)",
          sys: { country: "DEMO", sunrise: Math.floor(Date.now()/1000) - 21600, sunset: Math.floor(Date.now()/1000) + 21600 },
          weather: [{ main: "Clear", description: "demo clear sky", icon: "01d" }],
          main: { temp: 24, humidity: 55, pressure: 1015 },
          wind: { speed: 3.2 }
        },
        forecast: { list: [] }
      };
      for(let i=1; i<=5; i++) {
        const d = new Date(); d.setDate(d.getDate() + i);
        mockResult.forecast.list.push({
          dt_txt: d.toISOString().split('T')[0] + ' 12:00:00',
          main: { temp: 22 + Math.random() * 5 },
          weather: [{ main: "Clouds", description: "demo clouds", icon: "02d" }]
        });
      }
      return res.json(mockResult);
    }
    res.status(500).json({ message: 'Server error fetching weather', error: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find({ user: req.user }).sort({ createdAt: -1 }).limit(10);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching history', error: error.message });
  }
};

exports.saveHistory = async (req, res) => {
  try {
    const { city, temperature, weather_condition } = req.body;
    const history = new SearchHistory({
        user: req.user,
        city,
        temperature,
        weather_condition
    });
    await history.save();
    res.status(201).json(history);
  } catch(error) {
    res.status(500).json({ message: 'Server error saving search', error: error.message });
  }
}
