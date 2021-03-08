import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import 'materialize-css';
import './header.css';

export const Header = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <div>
            <nav id="navbar">
                <div class="nav-wrapper">
                    <ul class="left">
                        <li>
                            <a href="/" class="brand-logo">Travel App</a>
                        </li>
                        <li>
                            <div id="search_area">
                                <form class="search">
                                    <div class="input-field">
                                        <input class="search" id="search" type="search" required></input>
                                        <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                                        <i class="material-icons">close</i>
                                    </div>
                                </form>
                            </div>
                        </li>
                    </ul>
                    <ul class="right">
                        {isAuthenticated ? <li><a href="/signin">Sign out</a></li> : <li><a href="/signin">Sign in</a></li>}
                        <li>
                            <div id='select_area' class="input-field col s12">
                                <select class="selector">
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

