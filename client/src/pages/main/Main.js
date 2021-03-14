import React, { useCallback, useContext, useEffect, useState } from 'react';
import { urls } from '../../assets/constants/usrls';
import Card from '../components/card/Card';
import Carousel from 'react-elastic-carousel';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import './main.css';
import 'materialize-css';



export const Main = ({value}) => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];
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

  const filteredData = data.filter(country => {
    return country.name.toLowerCase().includes(value.toLowerCase()) || country.capital.toLowerCase().includes(value.toLowerCase()) 
  })
  if(filteredData.length === 0) {
    return (<div className='search_error'>we have nothing to show you</div>)
  } else {
    return (
      <div class="card_container">
        <Carousel breakPoints={breakPoints}>
          {
            data && filteredData.map((el, index) => {
              if(filteredData.length === 0) {
                return (
                  <div className='search_error'>we have nothing to show you</div>
                )
              }
              if(filteredData.length % 2 === 0) {
                if (index % 2 === 0 && index < filteredData.length) {
                    return (<div className='carosel_part'>
                      <Card element={el} />
                      <Card element={filteredData[index + 1]} />
                    </div>)
                  }
              } else {
                if (index % 2 === 0 && index < filteredData.length - 1) {
                  return (<div className='carosel_part'>
                    <Card element={el} />
                    <Card element={filteredData[index + 1]} />
                  </div>)
                }
                if (index === filteredData.length - 1){
                  return (<div className='carosel_part'>
                    <Card element={el} />
                  </div>)
                }
              }
            })}
        </Carousel>
      </div>
    )
  }
  }
  