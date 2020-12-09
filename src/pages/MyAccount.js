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
import { Layout } from 'antd';
import Table from 'react-bootstrap/Table'
const {  Sider, Content } = Layout;



function MyAccountPage() {
  const [loggedIn, setLoggedin] = useState(false);


  const [loginStatus, setLoginStatus] = useState("");

  const [EventNotifyList, setEventNotifyList] = useState([]);


  const router = useRouter();

  Axios.defaults.withCredentials = true;

  useEffect(()=>{ //everytime the page loads or refreshes, this useEffect will occur
    Axios.get(`${ BASE_API_URL }/api/getNotifyEvent`).then((response)=>{
      if(response.data.loggedIn == true){
        if(response.data.user[0].role == 'admin'){
          setLoginStatus("Your phone number is: " + response.data.user[0].phoneNum.substring(2) + ". Your role is: "+ response.data.user[0].role);
        }else{
          setLoginStatus("Your phone number is: " + response.data.user[0].phoneNum.substring(2));
        }
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
        <h1 className="account_information_text">My Account Information</h1>
        
        {loggedIn ? 
           <React.Fragment>
          {/* <Layout> */}
       
         
            {/* <Sider> */}
            {/* <div className="sign-up" style={{float:"right"}}> */}
            <div className="button-container" >
            <Button type="primary" onClick={logout}style={{float:"right", backgroundColor:"#A64AC9", borderColor:"#A64AC9",borderRadius:"4px",color:"white",marginRight:"12px"}} >Logout</Button>
            {/* </Sider>  */}
            
            {/* </div> */}
            </div>
         
          {/* </Layout> */}
           </React.Fragment>
         
          :
          null
          }
      </div>
      
      
      
        
        <h5 style={{marginLeft:"11px"}}>{loginStatus}</h5>
          
        {/* </div> */}
     
     
      <div className="notify_event_container" style={{margin:"15px"}}>
        {/* <table class="table table-sm table-striped"> */}
        <Table responsive striped bordered >
        <caption style = {{marginLeft:"15px",captionSide:"top", color:"black"}}>You will be notified for the following events: </caption>
          <thead>
            <tr>
              <th scope="col" style={{backgroundColor:"#A64AC9", color:"white"}}>Event Name</th>
              <th scope="col" style={{backgroundColor:"#A64AC9", color:"white"}}>Description</th>
              <th scope="col" style={{backgroundColor:"#A64AC9", color:"white"}}>Location</th>
              <th scope="col" style={{backgroundColor:"#A64AC9", color:"white"}}>Club Hosting</th>
              <th scope="col" style={{backgroundColor:"#A64AC9", color:"white"}}>Event Type</th>
              <th scope="col" style={{backgroundColor:"#A64AC9", color:"white"}}>Date of event</th>
              <th scope="col" style={{backgroundColor:"#A64AC9", color:"white"}}>Event start time</th>
              <th scope="col" style={{backgroundColor:"#A64AC9", color:"white"}}>Event end time</th>
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
                <td>{val.date}</td>
                <td>{val.start_time}</td>
                <td>{val.end_time}</td>
              </tr>
              );
            })
          }
          </tbody>
        </Table>




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
