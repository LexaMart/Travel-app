import React from 'react';
import { useSelector } from 'react-redux';
import 'materialize-css';
import './card.css';

const Card = ({ element }) => {
    const language = useSelector((store) => store.language)
    const styles = {
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.8))`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }

    return (
        <a href={`/country/${element.id}`} className="country-card" style={styles}>
            <img style={{
                position: "absolute",
                width: "auto",
                height: "100%",
                zIndex:"-1",
                top: "0",
                opacity:"0.5"
            }} src={element.cardBG} alt="imagecountry" className='card-bg-img' />
            <div className="country">{element.name[language]}</div>
            <div className="capital">{element.capital[language]}</div>
            <img className="flag" src={element.flag} alt="flag"></img>
        </a>
    )
}

export default Card;