import React from 'react';
import { NavLink, Link} from 'react-router-dom';
import facebook from '../images/facebook.svg';
import './Navigation.scss';
import icon from '../images/Like.svg';

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
  name: "Sign In",
}]

const socials = [{
  link: "https://hunterwics.github.io/",
  icon: facebook,
}, 
{
  link: "https://www.facebook.com/groups/HunterWomenInCS",
  icon: facebook,
}]

function Burger() {
  console.log("help");
  var x = document.getElementById("nav-container");
  if (x.className === "nav-container") {
    console.log("oop");
    x.className += " responsive";
  } else {
    x.className = "nav-container";
  }
}

const Navigation = (props) => (
  <nav className="nav-container" id="nav-container">
    <a href="javascript:void(0);" class="icon" onClick={() => Burger()}>
      <img src={icon}/>
    </a>
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
            <img src ={socials.icon}/>
          </Link>
        </div>
      ))
      }
    </div>
  </nav>
);

export default Navigation;