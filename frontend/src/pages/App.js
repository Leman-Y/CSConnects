import React from 'react';
import {Switch, Route, Router} from '../util/router.js';
import HomePage from './Home';
import AboutPage from './About';
import ResourcesPage from './Resources';
import EventsPage from './Events';
import ContactPage from './Contact';
import SignUpPage from './SignUp';
import LoginPage from './Login';
import EventsTestPage from './EventsTest';

function App(){
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/Events" component={EventsPage}/>
        <Route exact path="/About" component={AboutPage}/>
        <Route exact path="/Resources" component={ResourcesPage}/>
        <Route exact path="/Contact" component={ContactPage}/>
        <Route exact path="/SignUp" component={SignUpPage}/>
        <Route exact path="/Login" component={LoginPage}/>
        <Route exact path="/EventsTest" component={EventsTestPage}/>
      </Switch>
    </Router>

  );

}

export default App;