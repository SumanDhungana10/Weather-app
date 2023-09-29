import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState('Pokhara');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);

      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=101ce98c2828473477cf4465fee84470`;
        const response = await fetch(url);

        if (response.ok) {
          const responseData = await response.json();
          setCity(responseData);
        } else {
          setCity(null);
        }
      } catch (error) {
        console.error(error);
        setCity(null);
      }

      setLoading(false);
    };

    fetchApi();
  }, [search]);

  const getWeatherBackground = () => {
    if (city && city.weather && city.weather.length > 0) {
      const weatherType = city.weather[0].main.toLowerCase();
      return `weather-bg-${weatherType}`;
    }
    return '';
  };

  return (
    <>
    <div className="contanier">
      <div className={`box ${getWeatherBackground()}`}>
        <main>
        <div className="inputdata">
          <input
            type="search"
            className="inputfeild"
            placeholder="Search..."
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : !city ? (
          <p>No Data found</p>
        ) : (
          <div>
            <div className="info">
              <div className="location">{search},{city.sys.country}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{city.main.temp}°C</div>
              <h2 className="weather">{city.weather[0].main}</h2>
              <div className="tempmin_max">
                Min: {city.main.temp_min}°C | Max: {city.main.temp_max}°C
              </div>
              <div className="fell">
                Feels like:{city.main.feels_like}
              </div>
            </div>
             
              {city.wind && (
                <h3 className="wind-speed">Wind Speed: {city.wind.speed} m/s, {city.wind.deg}°</h3>
              )}
               {city.main && (
                <h3 className="wind-speed">Pressure: {city.main.pressure}</h3>
              )}
               {city.main && (
                <h3 className="wind-speed">Humibity: {city.main.humidity}</h3>
              )}
            
          </div>
        )}
        </main>
      </div>
      </div>
    </>
  );
}

export default App;
