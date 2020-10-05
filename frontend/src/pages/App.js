import React from 'react';
import {Switch, Route, Router} from '../util/router.js';
import HomePage from './Home';
import EventsPage from './Events';
import SignUp from './SignUp';

function App(){
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/Events" component={EventsPage}/>
        <Route exact path="/SignUp" component={SignUp}/>
      </Switch>
    </Router>

  );

}

export default App;