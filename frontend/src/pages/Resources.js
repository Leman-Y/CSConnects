import React from 'react';
import Navigation from '../components/Navigation';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';
import SmallSection from '../components/SmallSection';
import Panel from '../components/Panel';
import plus from '../images/plus.svg';
import '../styles/Home.scss';
import '../styles/themes.scss';

function ResourcesPage() {
  return (
    <div className="App">
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
      <Panel title="Internships & Jobs" icon={plus} id="1">
        <SmallSection title="Angel" link="https://angel.co/jobs?ref=onboarding"/>
        <SmallSection title="Startup Companies" link="https://angel.co/job-collections/52-best-startup-companies-to-watch-out-for-in-2020" 
        about="Some of the best startups to look out for."/>
        <SmallSection title="Built In NYC" link="https://www.builtinnyc.com/" about="Startup companies within NYC."/>
        <SmallSection title="MrShibe" link="https://mrshibe.me/" about="Find Software Engineering student internships and new grad entry level job."/>
      </Panel>
      <Panel title="Mentorships & Fellowships" icon={plus} id="2">
        <SmallSection title="BuiltByGirls" link="https://www.builtbygirls.com/about-wave" about="Mentorships for young women and non-binary students."/>
        <SmallSection title="RTC" link="https://rewritingthecode.org/fellowship/" about="A national program for college women interested in careers in tech."/>
      </Panel>
      <Panel title="Hunter College Resources" icon={plus} id="3">
        <SmallSection title="" link="" about=""/>
      </Panel>
    </div>
  );
}

export default ResourcesPage;
