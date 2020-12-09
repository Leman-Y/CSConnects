import React from 'react';
import Navigation from '../components/Navigation';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';
import '../styles/Home.scss';
import '../styles/themes.scss';
import SmallSection from '../components/SmallSection';
import '../styles/contact.scss';
import Contact from '../components/Contact';

function ContactPage() {
  return (
    <div className="App">
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
      <div className="contact-container">
        <SmallSection title="Contact Us" about="Email us with any questions, concerns or suggestions. We'll get back to you as soon as possible!"></SmallSection>
        <Contact/>
      </div>
    </div>
  );
}

export default ContactPage;