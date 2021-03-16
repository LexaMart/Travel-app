import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { AuthContext } from '../../../context/AuthContext';
import rateImg from '../../../assets/images/rate.svg';


export const SightCard = ({ index, element, modalActive, setModalActive }) => {
  const language = useSelector((store) => store.language);
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className={`country-content-card sight`}>
      <div className="front" style={{
        background: `url(${element.photo})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      </div>
      <div className="back">
        <span className="sight-name">{element.name[language]}</span>
        <p className="sight-description">
          {element.description[language]}
        </p>
        {isAuthenticated ? <div onClick={() => setModalActive(!modalActive)} className="rate-sight">
          <img className="rate-img" alt="rate" src={rateImg} style={{width: "25px", height:"25px", color:"white"}} />      
        </div> : <></>}
      </div>
    </div>
  )
}