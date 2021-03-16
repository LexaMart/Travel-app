import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { store } from '../../store/store';
import { showSearch } from '../../store/actions'

import './country.css';
import { Modal } from './components/RatePopup';


export const Country = () => {
  const language = useSelector((store) => store.language);
  const [modalActive, setModalActive] = useState(false);
  const [currentSight, setCurrentSight] = useState();
  const { id } = useParams();
  const { request, loading } = useHttp();
  const [data, setData] = useState(null);
  const dispatch = useDispatch();


  const getCountryData = useCallback(async () => {
    try {
      const fetched = await request(`${urls.GET_COUNTRY_INFO}?id=${id}`, 'GET', null)
      setData(fetched);
    } catch (e) { }
  }, [request, id])
  useEffect(
    () => {
      getCountryData();
      dispatch(showSearch(false));
    }, [getCountryData])
  if (loading) {
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center" ,alignItems:"center" }}>
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  )
  }
  return data && (
    <>
      <div className="country-content-wrapper">
        <CountryImage image={data.countryBg} />
        <Weather capital={data.capital[language]} weatherIcon={data.weather.icon} temp={data.weather.temp} feelsLike={data.weather.feelsLike} main={data.weather.main} timeZones={data.timezone} />
        <Exchange currency={data.currency} USD={data.currentCurrencies.USD} EUR={data.currentCurrencies.EUR} RUB={data.currentCurrencies.RUB} />
        <Description desc={data.description[language]} />
        <Video video={data.video} />
        <Map lat={data.lat} lng={data.lng} />
        {data.sights.map((el, index) => {
          return <div className={`grid-num-${index}`} onMouseEnter={() => { setCurrentSight(el.name[language]) }}><SightCard element={el} modalActive={modalActive} setModalActive={setModalActive} /> </div>
        })}
      </div>
      <Modal sight={currentSight} active={modalActive} setActive={setModalActive} />
    </>
  )
}