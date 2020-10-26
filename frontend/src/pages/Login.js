import React from 'react';
import Login from '../components/Login';
import Navigation from '../components/Navigation';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';

function LoginPage() {
  return (
    <div>
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
    <Login/>
    </div>
  );
}

export default LoginPage;
