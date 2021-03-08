import React from 'react';
import 'materialize-css';
import './card.css';

const Card = (props) => {
    return (
        <div class="card" style={{'backgroundImage' : `url(${props.cardBG})`}}>
            <div class="country">{props.name}</div>
            <div class="capital">{props.capital}</div>
            <img class="flag" src={props.flag} alt="flag"></img>
        </div>
    )
}

export default Card;