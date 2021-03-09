import React, { useCallback, useEffect, useState } from 'react';
import { urls } from '../../assets/constants/usrls';
import { useHttp } from '../../hooks/http.hook';
import { useParams } from "react-router-dom";


export const Country = () => {
  const { id } = useParams();
  const { request } = useHttp();
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
    <h1>{data.toString()}</h1>
  )
}