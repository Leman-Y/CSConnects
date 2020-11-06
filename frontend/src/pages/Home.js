import React from 'react';
import wics from '../images/wics.jpg';
import osc from '../images/osc.png';
import google from '../images/google.jpg';
import acm from '../images/acm.png';
import ClubCard from '../components/ClubCard';
import ClubContainer from '../components/ClubContainer';
import Navigation from '../components/Navigation';
import Icon from '../components/Icon';
import Like from '../images/Like.svg';
import Notif from '../images/notif.svg';
import Celebrate from '../images/celebrate.svg';
import IconContainer from '../components/IconContainer';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';
import '../styles/Home.scss';
import {useRouter} from '../util/router.js'


function HomePage() {
  const router = useRouter();
  return (
    <div className="App">
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
      <header className="App-header">
        <IconContainer title="How to join?">
          <Icon icon={Like} des="Sign up"/>
          <Icon icon={Notif} des="Look out for events"/>
          <Icon icon={Celebrate} des="Have fun!"/>
        </IconContainer>
        <ClubContainer title="Meet our clubs!">
          <ClubCard image={wics}/>
          <ClubCard image={osc}/>
          <ClubCard image={acm}/>
          <ClubCard image={google}/>
        </ClubContainer>
      </header>
    </div>
  );
}

export default HomePage;
