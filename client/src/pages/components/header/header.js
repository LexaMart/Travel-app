import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {changeLanguage} from '../../../store/actions';
import { AuthContext } from '../../../context/AuthContext';
import { useAuth } from '../../../hooks/auth.hook';
import { urls } from '../../../assets/constants/usrls';
import { store } from '../../../store/store';
import 'materialize-css';
import './header.css';


export const Header = ({ active, setActive, value, setValue }) => {
    const { isAuthenticated, photoPath } = useContext(AuthContext);
    const searchState = useSelector((store) => store.searchState)
    const language = useSelector((store) => store.language);
    const dispatch = useDispatch();
    const { logout } = useAuth();

    const changeLang = (e) => {
        console.log(e.target.value);
        dispatch(changeLanguage(e.target.value))
    }

    return (
        <div>
            <nav id="navbar">
                <div id="nav" className="nav-wrapper">
                    <ul className="left">
                        <li>
                            <a href="/" className="app_logo left">Travel App</a>
                        </li>
                        <li>
                            {searchState &&
                                <div id="search_area">
                                    <form className="search">
                                        <div className="input-field">
                                            <input className="search" id="search" type="search" autocomplete="off" onChange={(event) => setValue(event.target.value)}></input>
                                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                            <i className="material-icons">close</i>
                                        </div>
                                    </form>
                                </div>
                            }
                        </li>
                    </ul>
                    <ul className="right">
                        {isAuthenticated && photoPath && <li><img style={{ width: "25px" }} src={`${urls.GET_PHOTO}?path=${photoPath}`} alt="use_photo" /></li>}
                        {isAuthenticated ? <li><a href="/main" onClick={logout}>Sign out</a></li> : <li><div className="sign-in-link" onClick={() => setActive(!active)}>Sign in</div></li>}
                        <li>
                            <div id='select_area' className="input-field col s12">
                                <select onChange={changeLang} className="selector">
                                    <option value={0} selected={+language === 0} >English</option>
                                    <option value={1} selected={+language === 1}>Russian</option>
                                    <option value={2} selected={+language === 2}>Belarussian</option>
                                </select>
                            </div>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    );
}
