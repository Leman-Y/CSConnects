import React from 'react';
import Navigation from '../components/Navigation';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';
import Section from '../components/Section';
import about from '../images/about.png';
import '../styles/Home.scss';
import '../styles/themes.scss';

function AboutPage() {
  return (
    <div className="App">
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
    </div>
  );
}

export default AboutPage;
