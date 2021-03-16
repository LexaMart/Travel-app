import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { sendTranslation } from '../../../assets/constants/static.translations';


export const Weather = ({ capital, weatherIcon, temp, feelsLike, main, timeZones }) => {

  const language = useSelector((store) => store.language)

  // const setTranslationToDate = (lang) => {
  //   switch (lang) {
  //     case 0:
  //       return 'en-US';
  //     case 1:
  //     return 'ru'
  //     case 2 :
  //       return 'by-BY';
  //     default:
  //       return 'en-US';
  //   }
  // }

  const getTime = () => {
    return new Date().toLocaleTimeString('en-US', { timeZone: timeZones })
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
        <p className="data">{+language === 0 ? new Date().toLocaleDateString('en-US', options) : new Date().toLocaleDateString('rus', options) }</p>
        <p className="time">{time}</p>
      </div>
      <div className='weather'>
        <span className="vidjet-capital">{capital.toUpperCase()}</span>
        <img className="weather-img" src={weatherIcon} alt="weather" />
        <span className="temperature">{sendTranslation('temperature')[language]} {Math.round(temp)} &#176;С</span>
        <span className="feels-like">{sendTranslation('feelsLike')[language]} {Math.round(feelsLike)} &#176;С</span>
        <span className="weather-img__description">{+language === 0 ? main : ''}</span>
      </div>
    </div>
  )
}