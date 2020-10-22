import React from 'react';
import {Switch, Route, Router} from '../util/router.js';
import HomePage from './Home';
import EventsPage from './Events';
import SignUp from './SignUp';
import SMSForm from '../SMSForm';
import SignUpPage from './SignUp';
import LoginPage from './Login';
import EventsTestPage from './EventsTest';

function App(){
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/Events" component={EventsPage}/>
        <Route exact path="/SignUp" component={SignUp}/>
        <Route exact path="/TwilioForm" component={SMSForm}/>
        <Route exact path="/SignUp" component={SignUpPage}/>
        <Route exact path="/Login" component={LoginPage}/>
        <Route exact path="/EventsTest" component={EventsTestPage}/>
      </Switch>
    </Router>

  );

}

export default App;