import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { urls } from '../../../assets/constants/usrls';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { sendTranslation } from '../../../assets/constants/static.translations';

export const Modal = ({ sight, active, setActive }) => {
  const [rate, setRate] = useState(5)
  const [fetchedRates, setFetchedRates] = useState([]);
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const language = useSelector((store) => store.language);

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
              {sendTranslation('rateThis')[language]}
            </span>
            <input onChange={(e) => setRate(e.target.value)} type="range" id="rate" name="Rate"
              min="0" max="5" />
            <span className='curren-rate' style={{ marginBottom: "15px" }}>{rate}</span>
            <button onClick={() => submitRate(rate)} style={{ width: "100%", marginBottom: "10px" }} class="btn waves-effect waves-light red lighten-1" type="submit" name="action">{sendTranslation('rateSend')[language]}
              <i class="material-icons right">send</i>
            </button>
            <span className="average">{sendTranslation('average')[language]}: <b>{fetchedRates.reduce((a, el) => a += el.userRate, 0) !== 0 ? (fetchedRates.reduce((a, el) => a += el.userRate, 0) / fetchedRates.length).toFixed(1) : sendTranslation("noMark")[language]}</b></span>
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