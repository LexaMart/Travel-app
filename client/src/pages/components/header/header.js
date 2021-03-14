import React, { useContext} from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useAuth } from '../../../hooks/auth.hook';
import 'materialize-css';
import './header.css';

export const Header = ({active, setActive, value, setValue}) => {
    const { isAuthenticated } = useContext(AuthContext);
    const {logout} = useAuth();

    return (
        <div>
            <nav id="navbar">
                <div id='nav' class="nav-wrapper">
                    <ul class="left">
                        <li>
                            <a href="/" class="app_logo left">Travel App</a>
                        </li>
                        <li>
                            <div id="search_area">
                                <form class="search">
                                    <div class="input-field">
                                        <input class="search" id="search" type="search" autocomplete="off" onChange={(event) => setValue(event.target.value)}></input>
                                        <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                                        <i class="material-icons">close</i>
                                    </div>
                                </form>
                            </div>
                        </li>
                    </ul>
                    <ul class="right">
                        {isAuthenticated ? <li><a href="/main" onClick={logout}>Sign out</a></li> : <li><div className="sign-in-link" onClick={() => setActive(!active)}>Sign in</div></li>}
                        <li>
                            <div id='select_area' class="input-field col s12">
                                <select class="selector">
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
