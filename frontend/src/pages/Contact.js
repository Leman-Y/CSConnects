import React from 'react';
import Navigation from '../components/Navigation';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';
import '../styles/Home.scss';
import '../styles/themes.scss';
import SmallSection from '../components/SmallSection';

function ContactPage() {
  return (
    <div className="App">
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
      <header className="App-header">
        <SmallSection title = "Contact Us" about = "csconnects@gmail.com"/>
      
      </header>
    </div>
  );
}

export default ContactPage;
