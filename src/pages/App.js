import React from 'react';
import {Switch, Route, Router} from '../util/router.js';
import HomePage from './Home';
import AboutPage from './About';
import ResourcesPage from './Resources';
import EventsPage from './Events';
import SignUp from './SignUp';
import SMSForm from '../SMSForm';
import ContactPage from './Contact';
import SignUpPage from './SignUp';
import LoginPage from './Login';
import EventsTestPage from './EventsTest';
import WicsPage from './Wics';
import AcmPage from './Acm';
import OscPage from './Osc';
import DscPage from './Dsc';
import ClubsPage from './Clubs';
import MyAccount from './MyAccount';

function App(){
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/Events" component={EventsPage}/>
        <Route exact path="/SignUp" component={SignUp}/>
        <Route exact path="/TwilioForm" component={SMSForm}/>
        <Route exact path="/About" component={AboutPage}/>
        <Route exact path="/Resources" component={ResourcesPage}/>
        <Route exact path="/Contact" component={ContactPage}/>
        <Route exact path="/SignUp" component={SignUpPage}/>
        <Route exact path="/Login" component={LoginPage}/>
        <Route exact path="/EventsTest" component={EventsTestPage}/>
        <Route exact path="/Wics" component={WicsPage}/>
        <Route exact path="/Acm" component={AcmPage}/>
        <Route exact path="/Osc" component={OscPage}/>
        <Route exact path="/Dsc" component={DscPage}/>
        <Route exact path="/MyAccount" component={MyAccount}/>
        
      </Switch>
    </Router>

  );

}

export default App;