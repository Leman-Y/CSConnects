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




async function checkIfLoggedIn(){
  const arr =  await Axios.get('http://localhost:3001/checkIfLogin').then((response) =>
    response.data
    ).catch(err => {
          console.log(err);
      }
    )
    console.log(arr);

    const jsonArr = [];
    jsonArr.push({
      loggedIn: arr.loggedIn
    }

    )


  const arr1 = await Axios.post('http://localhost:3001/api/getNotifyEvent', {  
    phoneNum : Number(arr.user[0].phoneNum)
    }).then((resp)=>
      resp.data
    ).catch(err=> {
        console.log("error:" , err);
    })
      console.log(arr1);

    jsonArr.push({
      EventNotifyList: arr1
    })

    // jsonArr.push(
    //     arr.user[0].phoneNum
    // )


  console.log("json:" , jsonArr);
  return jsonArr;

  // const arr = await Axios.get("http://localhost:3001/login").then((response)=>{
  //   response.data





  //   // if(response.data.loggedIn == true){
  //   //   console.log(response);
  //   //   setLoginStatus("Your number: " + response.data.user[0].phoneNum);
  //   //   setUserPhoneNum(response.data.user[0].phoneNum);
  //   //   setLoggedin(true);
  //   //   const jsonArr = [];
  //   //   jsonArr.push(response.data.user[0].phoneNum);
  //   //   console.log(jsonArr);
  //   //   return jsonArr;
  //   // }else{
  //   //   // router.push("/login");
  //   //   return null;
  //   // }
  // })

  
}





function MyAccountPage() {
  const [loggedIn, setLoggedin] = useState(false);

  const [userPhoneNum, setUserPhoneNum] = useState("");

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




  useEffect(()=>{ //everytime the page loads or refreshes, this useEffect will occur
    var something;
    var arr =  checkIfLoggedIn();
    arr.then((result => {
      something = result;
      
    }));

     if(arr == null){
      router.push("/login");
     }else{
        setUserPhoneNum(arr[0]);
        setLoginStatus("Your number: " + arr[0]);
        setLoggedin(true);
        Axios.post('http://localhost:3001/api/getNotifyEvent', {  
          phoneNum : Number(userPhoneNum)
    
          }).then((response)=>{
            setEventNotifyList(response.data);
            console.log("event list: ");
            console.log(EventNotifyList);
              
          })
     }
  }, []);

  // useEffect(()=>{ //everytime the page loads, display all events that the user wants notification for
  //   console.log(userPhoneNum);

  // }, []);





  return (
    <div>
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
      <div className="sign-up">
        <div className="button-container">
          <h1>{loginStatus}</h1>
          <h1>{userPhoneNum}</h1>
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

          {console.log("running function: ", checkIfLoggedIn())}
        
          {/* {checkIfLoggedIn.EventNotifyList.map((val)=>{
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
            
            } */}
        </table>

      </div>
      
    </div>
  );
}

export default MyAccountPage;
