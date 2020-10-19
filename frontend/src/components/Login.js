import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { setUserSession } from '../util/Common';
import { useRouter } from '../util/router.js';
import './SignUp.scss';
import { Button } from 'antd';

function Login(props) {
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");


  const router = useRouter();

  Axios.defaults.withCredentials = true;

  const login = () =>{
    Axios.post('http://localhost:3001/login', { //makes an API call from the backend server from this specific URL. 
      userName: phonenumber, 
      userPassword: password
    }).then((response)=>{
        if(response.data.message){ //if there exist a message (the incorrect phone or number message) then that means the login is incorrect
          setLoginStatus(response.data.message);
        }else{
          setLoginStatus("You're logged in as " + response.data[0].phoneNum);
        }

    });
  };

  useEffect(()=>{ //everytime the page loads or refreshes, this useEffect will occur
    Axios.get("http://localhost:3001/login").then((response)=>{
      if(response.data.loggedIn == true){
        console.log(response);
        setLoginStatus("You're logged in as " + response.data.user[0].phoneNum);
      }
      
    })
  }, []);

  return (
    <div className="sign-up">
      <div className="welcome">
      
      <h1>Welcome Back!</h1>
      </div>
      <div>
        <p>Phone Number</p>
        <input className="sign-inputs" type="text" autoComplete="new-password" 
        onChange={(e) =>{
          setPhonenumber(e.target.value);
        }} />
 
        <p>Password</p>
        <input className="sign-inputs" type="password" autoComplete="new-password" 
        onChange={(e) =>{
          setPassword(e.target.value);
        }}/>
      </div>


      <div className="button-container">
        <h1>{loginStatus}</h1>
        <Button type="primary" onClick={login} >Login</Button><br />

        <Button type="primary" onClick={() => {router.push('/signup');}}>Sign Up</Button><br />
      </div>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;