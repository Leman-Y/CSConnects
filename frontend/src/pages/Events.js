import React, {useState , useEffect}from 'react';
import Axios from 'axios'; //using axios to do api calls
import Navigation from '../components/Navigation';
import '../styles/events.css';
function EventsPage(){
  const [eventList, seteventList] = useState([]);
  useEffect(()=>{
    Axios.get('http://localhost:3001/api/getEvents').then((response)=>{
      seteventList(response.data);
    })
  }, [])


  
  return(
    

    <div className="App">
      <Navigation/>
      <h1>Insert new events</h1>

      <div className="inputBoxesEvents">
        



      </div>

      <table id="events">
        <tr>
          <th>event_id</th>
          <th>date</th>
          <th>start time</th>
          <th>end time</th>
          <th>event name</th>
          <th>description</th>
          <th>location</th>
          <th>club hosting</th>
          <th>event type</th>
          
        </tr>
        {eventList.map((val)=>{
            return (
            <tr>
              <td>{val.event_id}</td>
              <td>{val.date}</td>
              <td>{val.start_time}</td>
              <td>{val.end_time}</td>
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
  );

}

export default EventsPage;