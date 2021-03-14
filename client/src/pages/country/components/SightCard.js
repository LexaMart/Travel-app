import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import rateImg from '../../../assets/images/rate.svg';


export const SightCard = ({ index, element, modalActive, setModalActive }) => {
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
        <span className="sight-name">{element.name}</span>
        <p className="sight-description">
          {element.description}
        </p>
        {isAuthenticated ? <div onClick={() => setModalActive(!modalActive)} className="rate-sight">
          <img className="rate-img" alt="rate" src={rateImg} style={{width: "25px", height:"25px", color:"white"}} />      
        </div> : <></>}
      </div>
    </div>
  )
}