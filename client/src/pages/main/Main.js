import React, { useCallback, useContext, useEffect, useState } from 'react';
import { urls } from '../../assets/constants/usrls';
import { useHttp } from '../../hooks/http.hook';
import Card from '../components/card/Card';
import { AuthContext } from '../../context/AuthContext';
import './main.css';
import 'materialize-css';




export const Main = () => {
  const { request } = useHttp();
  const [data, setData] = useState([])
  let { isCountry } = useContext(AuthContext);
  const getCountriesdata = useCallback(async () => {
    try {
      const fetched = await request(urls.GET_COUNTRIES, 'GET', null)
      setData(fetched.response);
    } catch (e) { }
  }, [request])
  useEffect(
    () => {
      isCountry = false;
      getCountriesdata();
    }, [getCountriesdata])
  return (
    <div class="card_container">
      {/* <Card name="France" capital="Paris" flag='https://restcountries.eu/data/fra.svg' cardBG='https://www.electatravels.com/wp-content/uploads/2015/12/Eiffel-Tower-Paris-France.jpg' /> */}
      {data && data.map((el) => {
        console.log(el)
        return <Card element={el} />
      })}
    </div>
  )
}