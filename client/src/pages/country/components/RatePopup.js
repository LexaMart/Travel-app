import React from 'react';

export const Modal = ({ sight, active, setActive }) => {
  return (
    <div onClick={()=> setActive(false)} className={active ? "popup popup-active" : "popup"}>
      <div onClick={(e) => e.stopPropagation()} className="popup-content">
        <h3 className="popup-name">{sight}</h3>
        <div className="rate-menu">
          <span className="rate-header">
            Rate this sight
          </span>
          <div className="stars"></div>
        </div>
      </div>
    </div>
  )
}