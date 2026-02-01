'use client';

import { useState, useEffect, FormEvent } from 'react';
import {
    Search,
    Wind,
    Droplets,
    Thermometer,
    Sun,
    Cloud,
    CloudRain,
    CloudSnow,
    CloudLightning,
    CloudDrizzle,
    CloudFog,
    Navigation
} from 'lucide-react';

interface WeatherData {
    current: {
        temperature_2m: number;
        weather_code: number;
        wind_speed_10m: number;
        relative_humidity_2m: number;
    };
    daily: {
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    };
    locationName: string;
}

export default function Home() {
    const [city, setCity] = useState('London');
    const [searchInput, setSearchInput] = useState('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getWeatherIcon = (code: number) => {
        if (code === 0) return <Sun size={80} color="#fbbf24" strokeWidth={1.5} />;
        if (code >= 1 && code <= 3) return <Cloud size={80} color="#94a3b8" strokeWidth={1.5} />;
        if (code >= 45 && code <= 48) return <CloudFog size={80} color="#cbd5e1" strokeWidth={1.5} />;
        if (code >= 51 && code <= 55) return <CloudDrizzle size={80} color="#60a5fa" strokeWidth={1.5} />;
        if (code >= 61 && code <= 67) return <CloudRain size={80} color="#3b82f6" strokeWidth={1.5} />;
        if (code >= 71 && code <= 77) return <CloudSnow size={80} color="#e2e8f0" strokeWidth={1.5} />;
        if (code >= 80 && code <= 82) return <CloudRain size={80} color="#2563eb" strokeWidth={1.5} />;
        if (code >= 95 && code <= 99) return <CloudLightning size={80} color="#f59e0b" strokeWidth={1.5} />;
        return <Sun size={80} color="#fbbf24" strokeWidth={1.5} />;
    };

    const getWeatherDescription = (code: number) => {
        const descriptions: { [key: number]: string } = {
            0: 'Clear Sky',
            1: 'Mainly Clear',
            2: 'Partly Cloudy',
            3: 'Overcast',
            45: 'Fog',
            48: 'Depositing Rime Fog',
            51: 'Light Drizzle',
            53: 'Moderate Drizzle',
            55: 'Dense Drizzle',
            61: 'Slight Rain',
            63: 'Moderate Rain',
            65: 'Heavy Rain',
            71: 'Slight Snow',
            73: 'Moderate Snow',
            75: 'Heavy Snow',
            95: 'Thunderstorm',
            96: 'Thunderstorm with Hail',
            99: 'Heavy Hail Thunderstorm',
        };
        return descriptions[code] || 'Varied Weather';
    };

    const fetchWeather = async (searchCity: string) => {
        try {
            setLoading(true);
            setError('');

            // 1. Geocoding
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchCity)}&count=1&language=en&format=json`
            );
            const geoData = await geoRes.json();

            if (!geoData.results || geoData.results.length === 0) {
                throw new Error('City not found');
            }

            const { latitude, longitude, name, country } = geoData.results[0];

            // 2. Weather Data
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
            );
            const weatherData = await weatherRes.json();

            setWeather({
                ...weatherData,
                locationName: `${name}, ${country}`
            });
        } catch (err) {
            setError('Could not fetch weather data. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(city);
    }, []);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (!searchInput.trim()) return;
        setCity(searchInput);
        fetchWeather(searchInput);
    };

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="container">
            <form className="search-box" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search city..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit" className="search-button">
                    <Search size={20} />
                </button>
            </form>

            {loading ? (
                <div className="loading-spinner"></div>
            ) : error ? (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            ) : weather ? (
                <div className="weather-card">
                    <div className="weather-info">
                        <h1 className="city-name">{weather.locationName}</h1>
                        <p className="date">{currentDate}</p>

                        <div className="weather-icon-wrapper">
                            {getWeatherIcon(weather.current.weather_code)}
                        </div>

                        <h2 className="temperature">
                            {Math.round(weather.current.temperature_2m)}°
                        </h2>
                        <p className="condition">
                            {getWeatherDescription(weather.current.weather_code)}
                        </p>
                    </div>

                    <div className="details-grid">
                        <div className="detail-item">
                            <Wind size={24} color="#38bdf8" />
                            <span className="detail-value">{weather.current.wind_speed_10m} km/h</span>
                            <span className="detail-label">Wind</span>
                        </div>
                        <div className="detail-item">
                            <Droplets size={24} color="#38bdf8" />
                            <span className="detail-value">{weather.current.relative_humidity_2m}%</span>
                            <span className="detail-label">Humidity</span>
                        </div>
                        <div className="detail-item">
                            <Thermometer size={24} color="#38bdf8" />
                            <span className="detail-value">
                                {Math.round(weather.daily.temperature_2m_max[0])}° / {Math.round(weather.daily.temperature_2m_min[0])}°
                            </span>
                            <span className="detail-label">High/Low</span>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
