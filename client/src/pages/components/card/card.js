import React from 'react';
import 'materialize-css';
import './card.css';

const Card = ({ element }) => {
    const styles = {
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.8)), url(${element.cardBG})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
    return (
        <div class="card" style={styles}>
            <div class="country">{element.name}</div>
            <div class="capital">{element.capital}</div>
            <img class="flag" src={element.flag} alt="flag"></img>
        </div>
    )
}

export default Card;