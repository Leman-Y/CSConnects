import React, { useState } from 'react';
import Axios from 'axios';
import { setUserSession } from '../util/Common';
import { useRouter } from '../util/router.js';
import './SignUp.scss';
import { Button } from 'antd';

function Login(props) {
  const userName = useFormInput('');
  const userPassword = useFormInput('');
  const [error, setError] = useState(null);
  const router = useRouter();

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    Axios.post('http://localhost:3001/api/get', {
      userName: userName.value, 
      userPassword: userPassword.value 
    }).then(response => {
      setUserSession(response.data.token, response.data.user);
      router.push('/');
    }).catch(error => {
      alert("no");
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div className="sign-up">
      <div className="welcome">
      
      <h1>Welcome Back!</h1>
      </div>
      <div>
        <p>Phone Number</p>
        <input className="sign-inputs" type="text" {...userName} autoComplete="new-password" />
 
        <p>Password</p>
        <input className="sign-inputs" type="password" {...userPassword} autoComplete="new-password" />
      </div>
      <div className="button-container">
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        <Button type="primary" onClick={handleLogin}>Login</Button><br />
        <Button type="primary" onClick={() => {
        router.push('/signup');
      }}>Sign Up</Button><br />
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