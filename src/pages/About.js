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
      <header className="App-header">
        <Section about_title="About Us" about="College isn’t easy. There’s already so much to naviagte and being in CS at Hunter College 
        means you’ll be juggling all your work on top of all the opportunities you have to keep up on. Many of us have missed opportunities, 
        events, and feel like everything is a mess. That’s why we built CSConnects."
        about2="CSConnects aims to bring everything you need to know, as a CS Student at Hunter, right here for your ease. Text reminders for club events, 
        resources for internships, mentorships and linking you to your campus."
        img={about}
        mission_title="Our Mission" 
        mission="CSConnects keeps Hunter students connected to each other, their clubs and their campus with ease."
        />
      
      </header>
    </div>
  );
}

export default AboutPage;
