import React, {useState , useEffect}from 'react';
import Axios from 'axios'; //using axios to do api calls
import { Router, useRouter } from '../util/router';
import './SignUp.scss';
import { Button } from 'antd';

function SignUp() {

  const router = useRouter();
  const [userName, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userRole, setRole] = useState("user");
  const [userNameList, setuserNameList] = useState([]);

  const [signupStatus, setsignupStatus] = useState("");


  

  useEffect(()=>{
    Axios.get('http://localhost:3000/api/get').then((response)=>{
      setuserNameList(response.data);
    })
  }, [])

  //function gets called when user clicks submit.
  
  const submitUser = () =>{
    Axios.post('http://localhost:3000/api/insert', { //makes an API call from the backend server from this specific URL. 
      userName: userName, 
      userPassword: userPassword,
      userRole: userRole
    }).then((response)=>{
      if(response.data.message){setsignupStatus(response.data.message);
      router.push("/login")}
      // if(response.data.message2){setsignupStatus(response.data.message2);}
      // else{setsignupStatus("Error somewhere ");}

    });
  };


  return (
    <div className="sign-up">
      {/* <div className="center"> */}
        <div className="welcome">
          <h1>Welcome!</h1>
          <h2>Create an account</h2>
        </div>

        <div className="sign-info"> 
          <p>Phone Number</p>
          <input className="sign-inputs" type="text" name="user" onChange={(e)=>{ //when the value changes, update the variable setUsername
            setUsername(e.target.value);

          }}/>
          <h5>{signupStatus}</h5>
          <p>Password</p>
          <input className="sign-inputs" type="password" name="password" onChange={(e)=>{
            setPassword(e.target.value);
          }}/>
        </div>
        <br/><br/>
        <div className="button-container">
        <Button type="primary" onClick={submitUser}>Submit</Button>
        <Button type="primary" onClick={() => {
        router.push('/login');
      }}>Login</Button>

        {/* {userNameList.map((val)=>{
          return (
          <h1>UserName: {val.phoneNum}</h1>
          );
        })} */}
        </div>
      </div>
      // </div>
  );
}

export default SignUp;
