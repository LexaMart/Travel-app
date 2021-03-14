import React, { useEffect, useState } from 'react';

export const Weather = ({ capital, weatherIcon, temp, feelsLike, main, timeZones }) => {
  const getTime = () => {
    return new Date().toLocaleTimeString('en-US', {timeZone: timeZones})
  }
  const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: timeZones };
  const [time, setTime] = useState(getTime());
  useEffect(() => {
    setInterval(() => {
      setTime(getTime())
    }, 1000)
  })
return (
  <div className="country-content-card weather-vidjet">
    <div className="current-time">
      <p className="data">{new Date().toLocaleDateString('en-US', options)}</p>
      <p className="time">{time}</p>
    </div>
    <div className='weather'>
      <span className="vidjet-capital">{capital.toUpperCase()}</span>
      <img className="weather-img" src={weatherIcon} alt="weather" />
      <span className="temperature">Temperature {Math.round(temp)} &#176;С</span>
      <span className="feels-like"> Feels like {Math.round(feelsLike)} &#176;С</span>
      <span className="weather-img__description">{main}</span>
    </div>
  </div>
)
}