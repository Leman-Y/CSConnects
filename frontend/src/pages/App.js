import React from 'react';
import {Switch, Route, Router} from '../util/router.js';
import HomePage from './Home';

function App(){
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
      </Switch>
    </Router>

  );

}

export default App;