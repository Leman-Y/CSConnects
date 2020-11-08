import React, { useEffect , useState} from 'react';
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

import Axios from 'axios';

function HomePage() {

  const [role, setRole] = useState('');
  Axios.defaults.withCredentials = true;

  useEffect(()=>{ //everytime the page loads or refreshes, this useEffect will occur
    Axios.get("http://localhost:3001/login").then((response)=>{
      if(response.data.loggedIn == true){
        setRole("Welcome " + response.data.user[0].phoneNum + ". You are a "+ response.data.user[0].role);
      }
    })
  }, []);


  return (
    <div className="App">
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
      <header className="App-header">
        <h2>{role}</h2>
        <IconContainer title="How to join?">
          <Icon icon={Like} des="Sign up"/>
          <Icon icon={Notif} des="Look out for events"/>
          <Icon icon={Celebrate} des="Have fun!"/>
        </IconContainer>
        <ClubContainer title="Meet our clubs!">
          <ClubCard image={wics} link="https://hunterwics.github.io/" id="1" des="Women in Computer Science is a club dedicated to all women interested in tech!"/>
          <ClubCard image={osc} link="https://hunterosc.org/?fbclid=IwAR0C49eFyepwX__DJwg4nkggWhpE0d-cLl06DY1nu8f-8eltissn97QoRyo" id="2" des="Open Source Club is ....."/>
          <ClubCard image={acm} link="https://www.hunteracm.org/" id="3" des="ACM is...."/>
          <ClubCard image={google} link="https://dsc.community.dev/hunter-college/" id="4" des="Google Developer Student Club is..."/>
        </ClubContainer>
      </header>
    </div>
  );
}

export default HomePage;
