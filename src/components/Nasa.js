import React, { useEffect, useState } from "react";
import styles from "../styles/Nasa.module.css"
// save key in configNasa for now, until process.env is resolved.
import { apiKeyNasa } from '../config/configNasa.js';

function Nasa() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKeyNasa}`);      const result = await response.json();
      setData(result);
      console.log(result);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.main}>
      {data && (
        <>
          <h1 className={styles.astronomyPictureTitle}>Astronomy Picture of the Day</h1>
          <h2 className={styles.nasaTitle}>{data.title}</h2>
          <img src={data.url} alt={data.title} className={styles.nasaImage} />

        </>
      )}
    </div>
  );
}

export default Nasa;