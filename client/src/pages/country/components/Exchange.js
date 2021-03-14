import React from 'react';

export const Exchange = ({ currency, USD, EUR, RUB }) => {
  return (
    <div className="country-content-card currencies">
      <div className="currency-block">
        <span className="currency-name">{currency}</span>
        <span className="curse-num">1</span>
      </div>
      {currency !== "USD" ?
        <div className="currency-block">
          <span className="currency-name">USD</span>
          <span className="curse-num">{USD}</span>
        </div>
        : <div style={{ display: "none" }} />
      }
      {currency !== "EUR" ?
        <div className="currency-block">
          <span className="currency-name">EUR</span>
          <span className="curse-num">{EUR ? EUR : 'API no data'}</span>
        </div>
        : <div style={{ display: "none" }} />
      }
      {currency !== "RUB" ?
        <div className="currency-block">
          <span className="currency-name">RUB</span>
          <span className="curse-num">{RUB}</span>
        </div>
        : <div style={{ display: "none" }} />
      }
    </div>
  )
}