import React, { useEffect, useState } from "react";
import styles from "../styles/Clock.module.css";


const Clock = () => {

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(
      () => setTime(new Date()),
      1000
    );

    
    let hr = hour12()
    const min = time.getMinutes().toLocaleString('en-UK', {minimumIntegerDigits: 2, useGrouping:false});
    const sec = time.getSeconds();

    function hour12() {
      let hour = time.getHours();

      if(hour === 0) {
        hour =12;
      }
      return hour;
    }

    const hourHand = document.getElementById("hourHand")
    const minuteHand = document.getElementById("minuteHand")
    const secondHand = document.getElementById("secondHand")
    
    
    hourHand.style.transform = `rotate(${hr*30 + min*0.5 - 180}deg)`
    minuteHand.style.transform = `rotate(${min*6 - 180}deg)`
    secondHand.style.transform = `rotate(${sec*6 - 180}deg)`

    return () => {
      clearInterval(interval);
    }

  }, [time]);


  return (
    
    <div className={styles.body}>
    
      <div className={styles.clock}>
        <div className={styles.face}>
          <div id="secondHand" className={`${styles.hand} ${styles.second}`}></div>
          <div id="minuteHand" className={`${styles.hand} ${styles.minute}`}></div>
          <div id="hourHand" className={`${styles.hand} ${styles.hour}`}></div>
          <div className={`${styles.hand} ${styles.center}`}></div>
        </div>
      </div>
    </div>
    
  );
};

export default Clock;
