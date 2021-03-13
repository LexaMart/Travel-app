import React, { useContext, useState } from 'react';

import { urls } from '../../../assets/constants/usrls';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';

export const Modal = ({ sight, active, setActive }) => {
  const [rate, setRate] = useState(5)
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const submitRate = async (rate) => {
    console.log(rate)
    await request(`${urls.POST_SIGHT_MARK}`, 'POST', {rate, sight }, {
      Authorization:  `Bearer ${token}`
    })
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
            <button onClick={() => submitRate(rate)} style={{ width: "100%" }} class="btn waves-effect waves-light red lighten-1" type="submit" name="action">Rate
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}