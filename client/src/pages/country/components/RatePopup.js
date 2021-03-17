import React, { useCallback, useContext, useEffect, useState } from 'react';

import { urls } from '../../../assets/constants/usrls';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';

export const Modal = ({ sight, active, setActive }) => {
  const [rate, setRate] = useState(5)
  const [fetchedRates, setFetchedRates] = useState([]);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const getRates = useCallback(async () => {
    try {
      if (!sight) {
        return
      }
      const fetched = await request(`${urls.GET_RATES}?sight=${sight}`, "GET");
      setFetchedRates(fetched.response);
    } catch (e) {
    }
  }, [request, sight])

  useEffect(() => {
    getRates();
  }, [getRates,])

  const submitRate = async (rate) => {
    await request(`${urls.POST_SIGHT_MARK}`, 'POST', { rate, sight }, {
      Authorization: `Bearer ${token}`
    });
    getRates();
  }
  return (
    <div onClick={() => setActive(false)} className={active ? "popup popup-active" : "popup"}>
      <div onClick={(e) => e.stopPropagation()} className="popup-content">
        <h3 style={{ textAlign: "center", marginBottom: "50px" }} className="popup-name">{sight}</h3>
        <div className="rate-menu">

          <div className="rate-block" style={{ display: "flex", flexFlow: "column", justifyContent: "center", textAlign: "center" }}>
            <span className="rate-header">
              Rate this sight
          </span>
            <input onChange={(e) => setRate(e.target.value)} type="range" id="rate" name="Rate"
              min="0" max="5" />
            <span className='curren-rate' style={{ marginBottom: "15px" }}>{rate}</span>
            <button onClick={() => submitRate(rate)} style={{ width: "100%", marginBottom:"10px"}} class="btn waves-effect waves-light red lighten-1" type="submit" name="action">Rate
              <i class="material-icons right">send</i>
            </button>
            <span className="average">Average rate: <b>{fetchedRates.reduce((a, el) => a += el.userRate, 0) !== 0 ? (fetchedRates.reduce((a, el) => a += el.userRate, 0)/fetchedRates.length).toFixed(1) : "No rates yet" }</b></span>
          </div>

        </div>
        <div className="users-rates">
          {fetchedRates && fetchedRates.map(el => {
            return <span className="sight-user-rate">{el.userName}: {el.userRate}; </span>
          })}
        </div>
      </div>
    </div>
  )
}