import React, {useState , useEffect}from 'react';
import './App.css';
import Axios from 'axios'; //using axios to do api calls
function App() {

  const [userName, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userNameList, setuserNameList] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setuserNameList(response.data);
    })
  }, [])

  //function gets called when user clicks submit.
  
  const submitUser = () =>{
    Axios.post('http://localhost:3001/api/insert', { //makes an API call from the backend server from this specific URL. 
      userName: userName, 
      userPassword: userPassword
    }).then(()=>{
      alert("successfully inserted");
    });
  };


  return (
    <div className="App">
      <h1>SIGN UP</h1>

      <div className="inputBoxes">
        <p>username</p><input type="text" name="user" onChange={(e)=>{ //when the value changes, update the variable setUsername
          setUsername(e.target.value);

        }}/>
        <p>password</p><input type="text" name="password" onChange={(e)=>{
          setPassword(e.target.value);
        }}/>

        <button onClick={submitUser}>Submit</button>

        {userNameList.map((val)=>{
          return (<h1>UserName: {val.phoneNum}
          
          </h1>
          );
        })}
      </div>
    </div>
  );
}

export default App;
