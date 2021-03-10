import React, { useCallback, useEffect, useState } from 'react';
import { urls } from '../../assets/constants/usrls';
import { useHttp } from '../../hooks/http.hook';
import { useParams } from "react-router-dom";
import './country.css';

export const Country = () => {
  const { id } = useParams();
  const { request, loading } = useHttp();
  const [data, setData] = useState([])
  const getCountryData = useCallback(async () => {
    try {
      const fetched = await request(`${urls.GET_COUNTRY_INFO}?id=${id}`, 'GET', null)
      setData(fetched);
    } catch (e) { }
  }, [request])
  useEffect(
    () => {
      getCountryData();
    }, [getCountryData])
  return (
    <div className="country-content-wrapper">
      <div className="card-image-handler">
        <img className="country-content-card" src={data.countryBg} alt='country' />
      </div>
      <div className="country-content-card weather-vidjet">
        <div className="current-time">
          <p className="data">March 11.03.2020</p>
          <p className="time">12:12</p>
        </div>
        <div className='weather'>
          <span className="vidjet-capital">{data.capital}</span>
          {/* <img className="weather-img" src={data.weather.icon} alt="weather" /> */}
        </div>
      </div>
    </div>
  )
}