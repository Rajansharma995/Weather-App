import React, { useState, useEffect } from "react";
import '../assets/css/weather.css';
import search_icon from '../assets/image/ss.png';
import clear_icon from '../assets/image/clear.png';
import cloud_icon from '../assets/image/sun.webp';
import snow_icon from '../assets/image/snoe.png';   
import rain_icon from '../assets/image/rain.png';
import humidity_icon from '../assets/image/humidity.png';
import drizzle_icon from '../assets/image/drizzle.png';
import wind_icon from '../assets/image/wind2.png';

const Weather = () => {
    const weatherApiKey = `dd94f859a0e52d6e4767fddf735f04a7`;
    const defaultCity = "Kathmandu";
    const [weatherIcon, setWeatherIcon] = useState(cloud_icon);
    const [weatherData, setWeatherData] = useState({
        humidity: "",
        windSpeed: "",
        temperature: "",
        location: defaultCity,
    });

    const fetchWeatherData = async (city) => {
        try {
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${weatherApiKey}`;
            const res = await fetch(weatherApiUrl);
            const data = await res.json();

            
            setWeatherData({
                humidity: `${data.main.humidity}%`,
                windSpeed: `${data.wind.speed} km/h`,
                temperature: `${data.main.temp}°C`,
                location: data.name,
            });

           
            if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
                setWeatherIcon(clear_icon);
            } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
                setWeatherIcon(cloud_icon);
            } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
                setWeatherIcon(drizzle_icon);
            } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
                setWeatherIcon(drizzle_icon);
            } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
                setWeatherIcon(rain_icon);
            } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
                setWeatherIcon(rain_icon);
            } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
                setWeatherIcon(snow_icon);
            } else {
                setWeatherIcon(clear_icon);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
         
        }
    }

    useEffect(() => {
        
        fetchWeatherData(defaultCity);
    }, []);

    const handleSearch = () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value !== "") {
           
            fetchWeatherData(element[0].value);
        }
    }

    return (
        <div className="weather-container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Search" />
                <div className="search-icon" onClick={handleSearch}>
                    <img src={search_icon} alt="Search Icon" />
                </div>
            </div>
            <div className="image">
                <img src={weatherIcon} alt="Weather Icon" />
            </div>
            <div className="temperature">{weatherData.temperature}</div>
            <div className="location">{weatherData.location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percentage">{weatherData.humidity}</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-speed">{weatherData.windSpeed}</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
