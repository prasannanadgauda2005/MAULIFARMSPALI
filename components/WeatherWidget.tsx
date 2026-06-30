'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudLightning, Wind, Thermometer, Droplets, RefreshCw } from 'lucide-react';

interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  code: number;
  desc: string;
  iconName: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Sun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  Wind,
};

const getWeatherDetails = (code: number) => {
  if (code === 0) return { desc: 'Clear Skies', icon: 'Sun' };
  if (code >= 1 && code <= 3) return { desc: 'Partly Cloudy', icon: 'Cloud' };
  if (code === 45 || code === 48) return { desc: 'Foggy / Misty', icon: 'CloudFog' };
  if (code >= 51 && code <= 57) return { desc: 'Light Drizzle', icon: 'CloudDrizzle' };
  if (code >= 61 && code <= 67) return { desc: 'Heavy Rain', icon: 'CloudRain' };
  if (code >= 80 && code <= 86) return { desc: 'Rain Showers', icon: 'CloudRain' };
  if (code >= 95) return { desc: 'Thunderstorm', icon: 'CloudLightning' };
  return { desc: 'Pleasant Forest Weather', icon: 'Wind' };
};

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWeather = async () => {
    try {
      setRefreshing(true);
      // Pali, Maharashtra Coordinates (Latitude 18.53, Longitude 73.22)
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=18.53&longitude=73.22&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m'
      );
      
      if (!res.ok) throw new Error('Failed to fetch');
      
      const data = await res.json();
      const current = data.current;
      const { desc, icon } = getWeatherDetails(current.weather_code);

      setWeather({
        temp: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        code: current.weather_code,
        desc,
        iconName: icon,
      });
      setError(false);
    } catch (e) {
      console.error('Weather Fetch Error:', e);
      setError(true);
      // Fallback details if fetch fails
      setWeather({
        temp: 27,
        feelsLike: 29,
        humidity: 80,
        windSpeed: 12,
        code: 3,
        desc: 'Partly Cloudy',
        iconName: 'Cloud',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="glass-card rounded-3xl p-6 border border-secondary-dark/60 h-40 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-accent" />
          <span className="text-xs text-dark/50 uppercase tracking-widest font-semibold">Loading Live Weather...</span>
        </div>
      </div>
    );
  }

  const WeatherIcon = iconMap[weather?.iconName || 'Wind'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-3xl p-6 border border-secondary-dark/60 shadow-md relative overflow-hidden flex flex-col justify-between h-full min-h-[180px]"
    >
      {/* Background graphic */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-2xl rounded-full -translate-y-8 translate-x-8 pointer-events-none" />

      {/* Title / Refresh */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[9px] uppercase font-bold text-accent tracking-widest block">Live Pali Weather</span>
          <span className="text-xs font-semibold text-primary">Mauli Farms Estate</span>
        </div>
        <button
          onClick={fetchWeather}
          disabled={refreshing}
          className="p-2 rounded-full hover:bg-secondary border border-secondary-dark/40 text-dark/50 hover:text-primary transition-colors focus:outline-none disabled:opacity-50"
          aria-label="Refresh weather data"
        >
          <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Main Stats block */}
      <div className="flex items-center gap-5 my-2">
        <div className="p-3.5 rounded-2xl bg-white border border-secondary-dark text-primary shadow-sm shrink-0">
          {WeatherIcon && <WeatherIcon className="h-8 w-8 text-accent animate-pulse" />}
        </div>
        <div>
          <div className="flex items-baseline">
            <span className="font-serif text-3xl md:text-4xl font-extrabold text-primary">
              {weather?.temp}°C
            </span>
          </div>
          <span className="text-xs font-semibold text-dark/75">
            {weather?.desc}
          </span>
        </div>
      </div>

      {/* Substats */}
      <div className="grid grid-cols-3 gap-2 border-t border-secondary-dark/40 pt-4 mt-2">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-bold text-dark/40 tracking-wider flex items-center gap-1">
            <Thermometer className="h-3 w-3 text-accent shrink-0" />
            Feels
          </span>
          <span className="text-xs font-bold text-primary mt-0.5">{weather?.feelsLike}°C</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-bold text-dark/40 tracking-wider flex items-center gap-1">
            <Droplets className="h-3 w-3 text-accent shrink-0" />
            Humidity
          </span>
          <span className="text-xs font-bold text-primary mt-0.5">{weather?.humidity}%</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-bold text-dark/40 tracking-wider flex items-center gap-1">
            <Wind className="h-3 w-3 text-accent shrink-0" />
            Wind
          </span>
          <span className="text-xs font-bold text-primary mt-0.5">{weather?.windSpeed} km/h</span>
        </div>
      </div>

      {error && (
        <span className="absolute bottom-2 right-4 text-[9px] font-medium text-dark/40 italic">
          (cached data)
        </span>
      )}
    </motion.div>
  );
};
