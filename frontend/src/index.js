import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/pages/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



//FOR MATT:
//git fetch --all: gets changes from all other branches
//git merge origin/develop: It takes the changes from develop branch and moves 
//the changes into the branch youre in right now
