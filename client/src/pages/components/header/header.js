import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useAuth } from '../../../hooks/auth.hook';
import 'materialize-css';
import './header.css';

export const Header = ({active, setActive}) => {
    const { isAuthenticated } = useContext(AuthContext);
    const {logout} = useAuth();
    return (
        <div>
            <nav id="navbar">
                <div className="nav-wrapper">
                    <ul className="left">
                        <li>
                            <a href="/" className="brand-logo">Travel App</a>
                        </li>
                        <li>
                            <div id="search_area">
                                <form className="search">
                                    <div className="input-field">
                                        <input className="search" id="search" type="search" required></input>
                                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                        <i className="material-icons">close</i>
                                    </div>
                                </form>
                            </div>
                        </li>
                    </ul>
                    <ul className="right">
                        {isAuthenticated ? <li><a href="/main" onClick={logout}>Sign out</a></li> : <li><div className="sign-in-link" onClick={() => setActive(!active)}>Sign in</div></li>}
                        <li>
                            <div id='select_area' className="input-field col s12">
                                <select className="selector">
                                    <option value="RU">Russian</option>
                                    <option value="EN">English</option>
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

