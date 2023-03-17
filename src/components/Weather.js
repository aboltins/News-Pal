
import React, { useEffect, useState } from "react";
import WeatherCard from './WeatherCard';

function Weather() {
  
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(async function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
  
        const response = await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`);
        const result = await response.json();
        setData(result);
        console.log(result);
      });
    }
    fetchData();
  }, []);
  
  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <WeatherCard weatherData={data}/>
      ): (
        <div></div>
      )}
      
    </div>
  );
}
export default Weather;