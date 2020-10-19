import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import { NavLink, Link} from 'react-router-dom';
import facebook from '../images/facebook.svg';
import './Navigation.scss';






function Navigation(props){
  const [loginStatus, setLoginStatus] = useState("");
  Axios.defaults.withCredentials = true;

  useEffect(()=>{ //everytime the page loads or refreshes, this useEffect will occur
    Axios.get("http://localhost:3001/login").then((response)=>{
      if(response.data.loggedIn == true){
        setLoginStatus("true");
      }else{
        setLoginStatus("false");
      }
      
    })
  }, []);
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

  const tabsLoggedIn = [{
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
    route: "/Login",
    name: "My Account",
  }]
  
  
  
  const socials = [{
    link: "https://hunterwics.github.io/",
    icon: facebook,
  }, 
  {
    link: "https://www.facebook.com/groups/HunterWomenInCS",
    icon: facebook,
  }]







  return(
  <nav className="nav-container">
    {loginStatus == 'true' && ( //if loginStatus is true, then render the following HTML
          <div className="link-container">
          {
           tabsLoggedIn.map((tab, index) =>(
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
    )}


    {loginStatus == 'false' && ( //else if loginStatus is false, then render the following HTML. 
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
    )}

  </nav>
  );
}

export default Navigation;