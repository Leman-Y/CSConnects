import React from 'react';
import Navigation from '../components/Navigation';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';
import wics from '../images/wics.jpg';
import ClubPages from '../components/ClubPages';
import Icon from '../components/Icon';
import LinkContainer from '../components/LinkContainer';
import facebook from '../images/facebook.svg';
import slack from '../images/slack.svg';
import discord from '../images/discord.svg';
import github from '../images/github.svg';
import website from '../images/code.svg';

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

    </div>
  );
}

export default WicsPage;