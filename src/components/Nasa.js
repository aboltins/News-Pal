import React, { useEffect, useState } from "react";
import styles from "../styles/Nasa.module.css"
function Nasa() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=mH6GIRZigeWu9agJQ4QL9uEipZfhzM0yINZxkGPc`);
      const result = await response.json();
      setData(result);
      console.log(result);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.main}>
      {data && (
        <>
          <h1>{data.title}</h1>
          <img src={data.url} alt={data.title} className={styles.small} />
          
        </>
      )}
    </div>
  );
}

export default Nasa;