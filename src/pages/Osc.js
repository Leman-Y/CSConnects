import React from 'react';
import Navigation from '../components/Navigation';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';
import osc from '../images/osc.png';
import ClubPages from '../components/ClubPages';
import Icon from '../components/Icon';
import LinkContainer from '../components/linkContainer';
import facebook from '../images/facebook.svg';
import github from '../images/github.svg';
import website from '../images/code.svg';

function OscPage() {
  return (
    <div>
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
      <div>
        <ClubPages club="Osc"
        image={osc}
        des="Open source club is a network of university students and clubs who share the belief that open source software is the engine that powers innovation. We are a group of Open Source programmers dedicated to using code to make Hunter, and the world at large a better place."
        des2="We are a place to learn, help others, and improve our community together. Our goals are to combat elitism, increase equitability and promote accessibility in computer coding and programming. To achieve these goals we will provide technical assistance for class, host technical and behavioral workshops and build, deploy and promote Open Source Software."
        time=""
        />
       <LinkContainer>
          <a href="https://hunterosc.org/" rel="noreferrer" target="_blank"><Icon icon={website}/></a>
          <a href="https://www.facebook.com/HunterOSC" rel="noreferrer" target="_blank"><Icon icon={facebook}/></a>
          <a href="https://github.com/Hunter-Open-Source-Club" rel="noreferrer" target="_blank"><Icon icon={github}/></a>
        </LinkContainer>
      </div>

    </div>
  );
}

export default OscPage;