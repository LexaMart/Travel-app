import React, { useCallback, useEffect, useState } from 'react';
import { urls } from '../../assets/constants/usrls';
import { useHttp } from '../../hooks/http.hook';
import { useParams } from "react-router-dom";
import './country.css';

export const Country = () => {
  const { id } = useParams();
  const { request, loading } = useHttp();
  const [data, setData] = useState(null)
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
  if (loading) {
    return <h1>loading</h1>
  }
  return data && (
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
          <span className="vidjet-capital">{data.capital.toUpperCase()}</span>
          {data ? <img className="weather-img" src={data.weather.icon} alt="weather" /> : "Weather loading"}
          <span className="temperature">Temperature {Math.round(data.weather.temp)} &#176;С</span>
          <span className="feels-like"> Feels like {Math.round(data.weather.feelsLike)} &#176;С</span>
          <span className="weather-img__description">{data.weather.main}</span>
        </div>
      </div>
      <div className="country-content-card currencies">
        <div className="currency-block">
          <span className="currency-name">{data.currency}</span>
          <span className="curse-num">1</span>
        </div>
        { data.currency !=="USD" ?
          <div className="currency-block">
            <span className="currency-name">USD</span>
            <span className="curse-num">{data.currentCurrencies.USD}</span>
          </div>
          : <div style={{display : "none"}} />
        }
        { data.currency !=="EUR" ?
          <div className="currency-block">
            <span className="currency-name">EUR</span>
            <span className="curse-num">{data.currentCurrencies.EUR ? data.currentCurrencies.EUR : 'API no data' }</span>
          </div>
          : <div style={{display : "none"}} />
        }
        { data.currency !=="RUB" ?
          <div className="currency-block">
            <span className="currency-name">RUB</span>
            <span className="curse-num">{data.currentCurrencies.RUB}</span>
          </div>
          : <div style={{display : "none"}} />
        }
      </div>
      <div className = "country-content-card country-description">
        <p className="description-text">{data.description}</p>
      </div>
      <div className="country-content-card video">
      <iframe style={{borderRadius: "35px"}} title="country sights" width="560" height="315" src={data.video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
      </div>
      <div className="country-content-card map">
        
      </div>
    </div>
  )
}