import React from 'react';
import Navigation from '../components/Navigation';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';
import acm from '../images/acm.png';
import ClubPages from '../components/ClubPages';
import Icon from '../components/Icon';
import LinkContainer from '../components/LinkContainer';
import facebook from '../images/facebook.svg';
import slack from '../images/slack.svg';
import github from '../images/github.svg';
import website from '../images/code.svg';

function AcmPage() {
  return (
    <div>
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
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

    </div>
  );
}

export default AcmPage;