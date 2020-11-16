import React, { useEffect, useState} from 'react';
import Axios from 'axios';
import { useRouter } from '../util/router.js';
import Login from '../components/Login';
import Navigation from '../components/Navigation';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';
import '../styles/MyAccount.css';

import { Button } from 'antd';

function MyAccountPage() {
  const [loggedIn, setLoggedin] = useState(false);

  const [userPhoneNum, setUserPhoneNum] = useState('');

  const [loginStatus, setLoginStatus] = useState("");

  const [EventNotifyList, setEventNotifyList] = useState([]);


  const router = useRouter();

  Axios.defaults.withCredentials = true;



  const logout = () =>{
    Axios.get("http://localhost:3001/logout").then((response)=>{
      if(response.data.loggedIn == false){
        setLoginStatus(null);
        setLoggedin(false);
        // window.location.reload();
        router.push("/login");
      }
      
    })
  };

  useEffect(()=>{ //everytime the page loads, display all events that the user wants notification for
    Axios.post('http://localhost:3001/api/getNotifyEvent', {  
      phoneNum : userPhoneNum
     
      }).then((response)=>{
        setEventNotifyList(response.data);
        console.log("event list: ");
        console.log(EventNotifyList);
          
      })
  }, []);

  useEffect(()=>{ //everytime the page loads or refreshes, this useEffect will occur
    Axios.get("http://localhost:3001/login").then((response)=>{
      if(response.data.loggedIn == true){
        //console.log(response);
        setLoginStatus("Your number: " + response.data.user[0].phoneNum);
        setUserPhoneNum(response.data.user[0].phoneNum);
        setLoggedin(true);
      }else{
        router.push("/login");
      }
    }, {withCredentials: true})
  }, []);



  return (
    <div>
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
      <div className="sign-up">
        <div className="button-container">
          <h1>{loginStatus}</h1>
          {loggedIn ? 
          <React.Fragment>
            <Button type="primary" onClick={logout} >Logout</Button><br />
          </React.Fragment>
          :
          null
          }
        </div>
      </div>
      <div className="notify_event_container">
        <table id="events">
          <tr>
            
            <th>event name</th>
            <th>description</th>
            <th>location</th>
            <th>club hosting</th>
            <th>event type</th>
            
          </tr>
          {EventNotifyList.map((val)=>{
              return (
              <tr>
                <td>{val.event_name}</td>
                <td>{val.event_description}</td>
                <td>{val.event_location}</td>
                <td>{val.club_name}</td>
                <td>{val.keyword_name}</td>
              </tr>

              );
            })}
        </table>

      </div>
      
    </div>
  );
}

export default MyAccountPage;
