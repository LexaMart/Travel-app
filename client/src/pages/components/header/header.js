import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useAuth } from '../../../hooks/auth.hook';
import { urls } from '../../../assets/constants/usrls';
import 'materialize-css';
import './header.css';

export const Header = ({active, setActive, value, setValue}) => {
    const { isAuthenticated, photoPath } = useContext(AuthContext);
    const {logout } = useAuth();
    useEffect(() => {
        console.log(photoPath)
    })
   
    return (
        <div>
            <nav  id="navbar">
                <div id="nav" className="nav-wrapper">
                    <ul className="left">
                        <li>
                            <a href="/" className="app_logo left">Travel App</a>
                        </li>
                        <li>
                            <div id="search_area">
                                <form className="search">
                                    <div className="input-field">
                                        <input className="search" id="search" type="search" autocomplete="off" onChange={(event) => setValue(event.target.value)}></input>
                                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                        <i className="material-icons" onClick='searchClear()'>close</i>
                                    </div>
                                </form>
                            </div>
                        </li>
                    </ul>
                    <ul className="right">
                        {isAuthenticated && photoPath && <li><img style={{width: "25px"}} src={`${urls.GET_PHOTO}?path=${photoPath}`} alt="use_photo" /></li>}
                        {isAuthenticated ? <li><a href="/main" onClick={logout}>Sign out</a></li> : <li><div className="sign-in-link" onClick={() => setActive(!active)}>Sign in</div></li>}
                        <li>
                            <div id='select_area' className="input-field col s12">
                                <select className="selector">
                                    <option value="EN">English</option>
                                    <option value="RU">Russian</option>
                                    <option value="BE">Belarussian</option>
                                </select>
                            </div>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    );
}
