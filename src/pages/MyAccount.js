import React, { useEffect, useState} from 'react';
import Axios from 'axios';
import { useRouter } from '../util/router.js';
import Login from '../components/Login';
import Navigation from '../components/Navigation';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';
import '../styles/MyAccount.css';
import { BASE_API_URL } from '../util/constants';

import { Button } from 'antd';



function MyAccountPage() {
  const [loggedIn, setLoggedin] = useState(false);


  const [loginStatus, setLoginStatus] = useState("");

  const [EventNotifyList, setEventNotifyList] = useState([]);


  const router = useRouter();

  Axios.defaults.withCredentials = true;

  useEffect(()=>{ //everytime the page loads or refreshes, this useEffect will occur
    Axios.get(`${ BASE_API_URL }/api/getNotifyEvent`).then((response)=>{
      if(response.data.loggedIn == true){
        setLoginStatus("Welcome " + response.data.user[0].phoneNum + ". You are a "+ response.data.user[0].role);
        setEventNotifyList(response.data.events);
        setLoggedin(true);
        console.log(response.data.events);
      }else{
        router.push("/login");
      }
    })
  }, []);



  
  const logout = () =>{
    Axios.get(`${ BASE_API_URL }/logout`).then((response)=>{
      if(response.data.loggedIn == false){
        setLoginStatus(null);
        setLoggedin(false);
        // window.location.reload();
        router.push("/login");
      }
      
    })
  };




  return (
    <div>
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
      <div className="sign-up container-fluid">
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
        <table class="table table-sm table-striped">
          <thead>
            <tr>
              <th scope="col">Event Name</th>
              <th scope="col">Description</th>
              <th scope="col">Location</th>
              <th scope="col">Club Hosting</th>
              <th>event type</th>
            </tr>
          </thead>
          <tbody>

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
            })
            }
          </tbody>
        </table>




        {/* <table id="events">
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
            })
            
            }
        </table> */}

      </div>
      
    </div>
  );
}

export default MyAccountPage;
