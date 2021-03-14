import React, { useCallback, useEffect, useState } from 'react';
import { urls } from '../../assets/constants/usrls';
import Card from '../components/card/card';
import Carousel from 'react-elastic-carousel';
import { useHttp } from '../../hooks/http.hook';
import './main.css';
import 'materialize-css';



export const Main = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];
  const { request } = useHttp();
  const [data, setData] = useState([])
  const getCountriesdata = useCallback(async () => {
    try {
      const fetched = await request(urls.GET_COUNTRIES, 'GET', null)
      setData(fetched.response);
    } catch (e) { }
  }, [request])
  useEffect(
    () => {
      getCountriesdata();
    }, [getCountriesdata])
  return (
    <div class="card_container">
      <Carousel breakPoints={breakPoints}>
        {
          data && data.map((el, index) => {
            if (index % 2 === 0 && index < data.length) {
              return (<div className='carosel_part'>
                <Card element={el} />
                <Card element={data[index + 1]} />
              </div>)
            }
          })}
      </Carousel>
    </div>
  )
}