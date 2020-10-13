import React from 'react';
import {Switch, Route, Router} from '../util/router.js';
import HomePage from './Home';
import EventsPage from './Events';
import SignUpPage from './SignUp';
import LoginPage from './Login';

function App(){
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/Events" component={EventsPage}/>
        <Route exact path="/SignUp" component={SignUpPage}/>
        <Route exact path="/Login" component={LoginPage}/>

      </Switch>
    </Router>

  );

}

export default App;