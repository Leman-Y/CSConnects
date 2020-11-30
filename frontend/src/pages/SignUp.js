import React from 'react';
import SignUp from '../components/SignUp';
import Navigation from '../components/Navigation';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';

function SignUpPage() {
  return (
    <div>
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
      <SignUp/>

    </div>
  );
}

export default SignUpPage;
