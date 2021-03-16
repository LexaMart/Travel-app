import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'materialize-css';
import './card.css';

const Card = ({ element }) => {
    const language = useSelector((store) => store.language)
    const styles = {
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.8)), url(${element.cardBG})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
    
    return (
        <a href={`/country/${element.id}`}class="country-card" style={styles}>
            <div class="country">{element.name[language]}</div>
            <div class="capital">{element.capital[language]}</div>
            <img class="flag" src={element.flag} alt="flag"></img>
        </a>
    )
}

export default Card;