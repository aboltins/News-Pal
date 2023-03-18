import React from "react";
import styles from "../styles/Weather.module.css";
import moment from "moment";
import { Button } from "semantic-ui-react";

const refresh = () => {
  window.location.reload();
};

const WeatherCard = ({ weatherData }) => (
  <div className={styles.main}>
    <div className={styles.top}>
      <p className={styles.header}>{weatherData.name}</p>
      <Button
        className={styles.button}
        inverted
        color="olive"
        circular
        icon="refresh"
        onClick={refresh}
      />
    </div>
    <div className={styles.flex}>
      <p className={styles.day}>
        {moment().format("dddd")}, <span>{moment().format("LL")}</span>
      </p>
      <img
       
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].main}
      />
    </div>

    <div className={styles.flex}>
      <p className={styles.temp}>Temperature: {weatherData.main.temp} &deg;C</p>
      <p className={styles.temp}>{weatherData.weather[0].description.toUpperCase()}</p>
    </div>

    <div className={styles.flex}>
    <p className={styles.temp}>Feels like: {weatherData.main.feels_like} &deg;C</p>
      
      <p className={styles.temp}>Humidity: {weatherData.main.humidity} %</p>
    </div>

    <div className={styles.flex}>
      <p className={styles.temp}>
        Sunrise:{" "}
        {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-UK")}
      </p>
      <p className={styles.temp}>
        Sunset:{" "}
        {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-UK")}
      </p>
    </div>

  </div>
);

export default WeatherCard;