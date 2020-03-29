import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/incidents/new" component={NewIncident} exact />
      </Switch>
    </BrowserRouter>
  );
}
