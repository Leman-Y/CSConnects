import React from 'react';
import {Switch, Route, Router} from '../util/router.js';
import HomePage from './Home';
import EventsPage from './Events';

function App(){
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/Events" component={EventsPage}/>
      </Switch>
    </Router>

  );

}

export default App;