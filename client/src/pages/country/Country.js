import React, { useCallback, useEffect, useState } from 'react';

import { urls } from '../../assets/constants/usrls';
import { useHttp } from '../../hooks/http.hook';
import { useParams } from "react-router-dom";

import { CountryImage } from './components/CountryImage';
import { Weather } from './components/Weather';
import { Exchange } from './components/Exchange';
import { Description } from './components/CountryDescription';
import { Video } from './components/Video';
import { Map } from './components/Map';
import { SightCard } from './components/SightCard';

import './country.css';
import { Modal } from './components/RatePopup';

export const Country = () => {
  const [modalActive, setModalActive] = useState(false);
  const [currentSight, setCurrentSight] = useState();
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
    return <h1 style={{ height: "100vh" }}>loading</h1>
  }
  return data && (
    <>
      <div className="country-content-wrapper">
        <CountryImage image={data.countryBg} />
        <Weather capital={data.capital} weatherIcon={data.weather.icon} temp={data.weather.temp} feelsLike={data.weather.feelsLike} main={data.weather.main} timeZones={data.timezone} />
        <Exchange currency={data.currency} USD={data.currentCurrencies.USD} EUR={data.currentCurrencies.EUR} RUB={data.currentCurrencies.RUB} />
        <Description desc={data.description} />
        <Video video={data.video} />
        <Map lat={data.lat} lng={data.lng} />
        {data.sights.map((el) => {
          return <div onMouseEnter={() => {setCurrentSight(el.name) }}><SightCard element={el} modalActive={modalActive} setModalActive={setModalActive} /> </div>
        })}
      </div>
      <Modal sight={currentSight} active={modalActive} setActive={setModalActive} />
    </>
  )
}