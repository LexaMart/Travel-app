import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { Country } from './pages/country/Country';
import { Main } from './pages/main/Main';
import { StylesPage } from './pages/Styles/Styles';

export const useRoutes = (isAuthenticated) => {
  return (
    <Switch>
      <Route path="/main">
        <Main />
      </Route>
      <Route path="/country/:id">
        <Country />
      </Route>
      <Route path="/Styles">
        <StylesPage />
      </Route>
      <Redirect to="/main" /> 
    </Switch>
  )
}