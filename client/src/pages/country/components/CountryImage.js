import React from 'react'

export const CountryImage = ({ image }) => {
  return (
    <div className="card-image-handler">
      <img className="country-content-card" src={image} alt='country' />
    </div>
  )
}