import React from 'react';
import Navigation from '../components/Navigation';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';
import wics from '../images/wics.jpg';
import osc from '../images/osc.png';
import acm from '../images/acm.png';
import dsc from '../images/google.jpg';
import ClubPages from '../components/ClubPages';
import Icon from '../components/Icon';
import LinkContainer from '../components/LinkContainer';
import facebook from '../images/facebook.svg';
import slack from '../images/slack.svg';
import discord from '../images/discord.svg';
import github from '../images/github.svg';
import website from '../images/code.svg';
import twitter from '../images/twitter.svg';
import insta from '../images/insta.svg';

function WicsPage() {
  return (
    <div>
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
      <div>
        <ClubPages club="Wics"
        image={wics}
        des="Hunter Women in Computer Science is a club at Hunter College creating a community and space for women to share their common interest of Computer Science. All majors are welcomed to join!"
        des2="Our goal is to build a supportive and friendly community for women in the Computer Science Department, from prospective majors through graduation, to educate on computer science topics, to raise awareness of issues facing women in tech, and to encourage professional development for our members. This club is not restricted to Computer Science majors and minors. We welcome anyone who holds interest in the field and identifies as a woman."
        time="We meet on Tuesdays from 7pm-8:30pm in N100J."
        />
        <LinkContainer>
          <a href="https://hunterwics.github.io/" rel="noreferrer" target="_blank"><Icon icon={website}/></a>
          <a href="https://www.facebook.com/groups/HunterWomenInCS" rel="noreferrer" target="_blank"><Icon icon={facebook}/></a>
          <a href="https://hunterwomenincs.slack.com/" rel="noreferrer" target="_blank"><Icon icon={slack}/></a>
          <a href="https://discord.gg/ePUbqhrbYc" rel="noreferrer" target="_blank"><Icon icon={discord}/></a>
          <a href="https://github.com/hunterwics" rel="noreferrer" target="_blank"><Icon icon={github}/></a>
        </LinkContainer>
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

      <div>
        <ClubPages club="ACM"
        image={acm}
        des="We're a community of Hunter College students interested in CS and tech. We design, code, build, and learn about topics not taught in our classes."
        des2="Come meet other students, work on projects, listen to tech talks, participate in workshops, and more! We welcome all members of the CUNY community regardless of technical experience. Join us even if you've never written a single line of code; we're all here to learn."
        time="We meet every Thursday at 5:30pm to 7:30pm in the JLAB (1000J in the North building)."
        />
        <LinkContainer>
          <a href="https://www.hunteracm.org/?fbclid=IwAR3yCVYLpi4iG7PtPSsi0gRmYnJaY-yXvdydEZoVE8ifmWz_85PfvFI_6tg" rel="noreferrer" target="_blank"><Icon icon={website}/></a>
          <a href="https://www.facebook.com/hunteracm" rel="noreferrer" target="_blank"><Icon icon={facebook}/></a>
          <a href="https://hunteracm.slack.com/" rel="noreferrer" target="_blank"><Icon icon={slack}/></a>
          <a href="https://github.com/hunteracm" rel="noreferrer" target="_blank"><Icon icon={github}/></a>
        </LinkContainer>
      </div>

      <div>

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
    </div>
  );
}

export default WicsPage;