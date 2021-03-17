import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Country } from './pages/country/Country';
import { Main } from './pages/main/Main';

export const useRoutes = (isAuthenticated, value) => {
  return (
    <Switch>
      <Route path="/main">
        <Main value={value} />
      </Route>
      <Route path="/signin">
      </Route>
      <Route path="/country/:id">
        <Country />
      </Route>
      <Redirect to="/main" />
    </Switch>
  )
}