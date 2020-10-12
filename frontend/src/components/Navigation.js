import React from 'react';
import { NavLink, Link} from 'react-router-dom';
import facebook from '../images/facebook.svg';
import './Navigation.scss';

const tabs = [{
  route: "/",
  name: "Home",
},
{
  route: "/Events",
  name: "Events",
},
{
  route: "/About",
  name: "About",
},
{
  route: "/Resources",
  name: "Resources",
},
{
  route: "/Contact",
  name: "Contact",
},
{
  route: "/SignUp",
  name: "SignUp",
}]

const socials = [{
  link: "https://hunterwics.github.io/",
  icon: facebook,
}, 
{
  link: "https://www.facebook.com/groups/HunterWomenInCS",
  icon: facebook,
}]

const Navigation = (props) => (
  <nav className="nav-container">
    <div className="link-container">
       {
        tabs.map((tab, index) =>(
          <div className="navigation" key={`tab-${index}`}>
            <NavLink className="nav-routes" exact activeClassName="selected" to={tab.route}>
              {tab.name}
            </NavLink>
          </div>
        ))
      }
      {
      socials.map((socials, index) =>(
        <div className="navigation" key={`tab-${index}`}>
          <Link to={{ pathname: socials.link }} target="_blank" >
            <img src ={socials.icon} />
          </Link>
        </div>
      ))
      }
    </div>
  </nav>
);

export default Navigation;