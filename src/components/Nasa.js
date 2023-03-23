import React, { useEffect, useState } from "react";
import styles from "../styles/Nasa.module.css"
function Nasa() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY_NASA}`);      const result = await response.json();
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