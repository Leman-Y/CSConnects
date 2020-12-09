import React from 'react';
import Navigation from '../components/Navigation';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';
import dsc from '../images/google.jpg';
import ClubPages from '../components/ClubPages';
import Icon from '../components/Icon';
import LinkContainer from '../components/LinkContainer';
import facebook from '../images/facebook.svg';
import discord from '../images/discord.svg';
import insta from '../images/insta.svg';
import website from '../images/code.svg';
import twitter from '../images/twitter.svg';

function DscPage() {
  return (
    <div>
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
      <div>
        <ClubPages club="Dsc"
        image={dsc}
        des="DSC Hunter is Hunter College's chapter of Google Developer Student Club, supported by Google and Google Developers. Developer Student Clubs are university based community groups for students interested in Google developer technologies. Students from all undergraduate or graduate programs with an interest in growing as a developer are welcome."
        des2="By joining a DSC, students grow their knowledge in a peer-to-peer learning environment and build solutions for local businesses and their community."
        time=""
        />
        <LinkContainer>
          <a href="https://dsc.community.dev/hunter-college/" rel="noreferrer" target="_blank"><Icon icon={website}/></a>
          <a href="https://www.facebook.com/Google-Developers-967415219957038/" rel="noreferrer" target="_blank"><Icon icon={facebook}/></a>
          <a href="https://www.instagram.com/googledevs/" rel="noreferrer" target="_blank"><Icon icon={insta}/></a>
          <a href="https://discord.com/invite/9T7mQrfs?utm_source=Discord%20Widget&utm_medium=Connect" rel="noreferrer" target="_blank"><Icon icon={discord}/></a>
          <a href="https://twitter.com/googledevs" rel="noreferrer" target="_blank"><Icon icon={twitter}/></a>
        </LinkContainer>
      </div>

    </div>
  );
}

export default DscPage;