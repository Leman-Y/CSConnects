import React, {useState , useEffect}from 'react';
import Axios from 'axios'; //using axios to do api calls
import { NavLink, Link} from 'react-router-dom';
import facebook from '../images/facebook.svg';
import insta from '../images/insta.svg';
import './Navigation.scss';
import { BASE_API_URL } from '../util/constants';


const tabs = [{
  route: "/",
  name: "Home",
},
{
  route: "/EventsTest",
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
  name: "Sign Up",
}]

const tabsLoggedIn = [{
  route: "/",
  name: "Home",
},
{
  route: "/EventsTest",
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
  route: "/MyAccount",
  name: "My Account",
}]


function Burger() {
  var x = document.getElementById("nav-container");
  if (x.className === "nav-container") {
    x.className += " responsive";
  } else {
    x.className = "nav-container";
  }
}



function Navigation(props) {

  const [loggedIn, setLoggedin] = useState(false);
  Axios.defaults.withCredentials = true;
  useEffect(()=>{ //everytime the page loads or refreshes, this useEffect will occur
    Axios.get(`${ BASE_API_URL }/checkIfLogin`).then((response)=>{
      if(response.data.loggedIn == true){
        //console.log(response);
        setLoggedin(true);
      }
      
    }, {withCredentials: true})
  }, []);



 return(
  <nav className="nav-container" id="nav-container">

    <div className="line-container">
      <div className="nav-line"></div>
    </div>
    <div className="left-container" onClick={props.onclick}>
          <a href="/" className="home-icon">
          <img className="title-icon" src={props.icon}/>
          <div className="site-title">{props.name}</div>
        </a>
    </div>
    <a href="javascript:void(0);" className="icon" onClick={() => Burger()}>
      <img alt="navigation pop up" src={props.burger}/>
    </a>
    <div className="link-container">
      {loggedIn ?
        
        tabsLoggedIn.map((tab, index) =>(
          <div className="navigation" key={`tab-${index}`}>
            <NavLink className="nav-routes" exact activeClassName="selected" to={tab.route}>
              {tab.name}
            </NavLink>
          </div>
        ))
        
        :
        
          tabs.map((tab, index) =>(
            <div className="navigation" key={`tab-${index}`}>
              <NavLink className="nav-routes" exact activeClassName="selected" to={tab.route}>
                {tab.name}
              </NavLink>
            </div>
          ))
          
      }
    </div>
  </nav>
);

}
export default Navigation;
