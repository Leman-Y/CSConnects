import React, {useState , useEffect, Component}from 'react';
import Axios from 'axios'; //using axios to do api calls
import Navigation from '../components/Navigation';
import EventCard from '../components/EventCard';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';
import acm from '../images/acm.png';
import '../styles/events.css';
import '../styles/Home.scss';
import moment from 'moment';
import '../styles/events.css';

import Calendar from '../components/Calendar';

const style = {
  position: "relative",
  margin: "50px auto"
}




class EventsPage extends Component{



  constructor(props) {
    super(props);
    this.state = {
      events: {},
      myDay: '',
      myMonth: '',
      myYear: ''
      };
 
    
  };

  onDayClick = (e,day,month, year) =>{
    Axios.post('http://localhost:3001/api/getEvents', { //makes an API call from the backend server from this specific URL. 
      year: this.state.myYear, 
      month: this.state.myMonth,
      day: this.state.myDay
    }).then((response)=>{
        this.setState({
          events: response.data
        })
      

    });


    this.setState({
      myDay: day,
      myMonth: month,
      myYear: year
    });

  }

//Maisa's changes
// function EventsPage(){
 
//   return(
//     <div className="App">
//       <div className="NavBar">
//         <Navigation icon={Computer} name="CSConnects" burger={burger}/>
//       </div>
//       <h1>Insert new events</h1>
//       <div className="inputBoxesEvents">





      // {/* <EventCard title="Google Mock Tech Interview" image={acm} time="TBA"/> */}
      // </div>
      // );



  //If this function sees that the event object is updated / changed, it will run this function again, which updates the values inside the table
	_renderObject(){
		return Object.entries(this.state.events).map(([key, value], i) => {
			return (
				<tr key={key}>
					<td>{value.event_id}</td>
					<td>{value.event_name}</td>
          <td>{value.event_description}</td>
				</tr>
			)
		})
	}

  render(){
    return(
      <div className="App">
        <Navigation/>
        <Calendar style={style} width = "500px" onDayClick={(e , day,month, year)=>this.onDayClick(e,day,month, year)}/>
        <div>
          {this.state.myYear}{"-"}{this.state.myMonth}{"-"}{this.state.myDay}
          
          <table id="events">
          <tr>
            <th>event_id</th>
            <th>event name</th>
            <th>description</th>            
          </tr>

          {this._renderObject()}
      </table>
        </div>

      </div>
    );
  }

}


export default EventsPage;
// const [eventList, seteventList] = useState([]);
// const [role, setRole] = useState('');
// const [isAdmin, setisAdmin] = useState(false);
// Axios.defaults.withCredentials = true;

// export default class DemoApp extends React.Component {
//     constructor(props) {
//       super(props);
//       function getEvents(){
//         Axios.get('http://localhost:3001/api/getEvents').then((response)=>{
//           seteventList(response.data);
//         })
//         return 0;
//       }
//     }
//   render() {
//     return (
//       <FullCalendar
//         plugins={[ dayGridPlugin ]}
//         initialView="dayGridMonth"
//         weekends={false}
//         events={[
//           { title: 'event 1', date: '2020-10-01' },
//           { title: 'event 2', date: '2020-10-02' }
//         ]}
//       />
//     )
//   }
//   }

// function getEventsArray(eventList){
//   let arr = [];
//   {eventList.map((val)=>{
      
//       arr.push(({title:val.event_name,date: val.date }));
//   })}
//   console.log(arr);
//   return arr;
    
//   }


// function EventsPage(){
//   Axios.defaults.withCredentials = true;
//   const [eventList, seteventList] = useState([]);
//   const [role, setRole] = useState('');
//   const [isAdmin, setisAdmin] = useState(false);
//   useEffect(()=>{
//     Axios.get('http://localhost:3001/api/getEvents').then((response)=>{
//       seteventList(response.data);
//     })
//   }, [])

//   return(
//     <div className="App">
//     {getEventsArray(eventList)}
//     {eventList.map((val)=>{
//             return (
//             <div>
//               {val.date}
//               {val.event_name}
//             </div>
//             );
//     })}
//       <FullCalendar
//         plugins={[ dayGridPlugin ]}
//         initialView="dayGridMonth"
//         weekends={false}
//         // events={
//         //     getEventsArray(eventList)
//         // }
//         eventContent={renderEventContent(eventList)}
//       />
//     </div>
//   );


// }



// import React, {useState , useEffect}from 'react';
// import Axios from 'axios'; //using axios to do api calls
// import Navigation from '../components/Navigation';
// import '../styles/events.css';
//
// function EventsPage(){


//   Axios.defaults.withCredentials = true;
//   const [eventList, seteventList] = useState([]);
//   const [role, setRole] = useState('');
//   const [isAdmin, setisAdmin] = useState(false);
//   useEffect(()=>{
//     Axios.get('http://localhost:3001/api/getEvents').then((response)=>{
//       seteventList(response.data);
//     })
//   }, [])
  
//   useEffect(()=>{ //everytime the page loads or refreshes, this useEffect will occur
//     Axios.get("http://localhost:3001/login").then((response)=>{
//       if(response.data.loggedIn == true){
//         if(response.data.user[0].role == 'admin'){
//           setisAdmin(true);
//         }
//         console.log(response.data.user);
//         setRole("Welcome " + response.data.user[0].phoneNum + ". You are a "+ response.data.user[0].role);
//       }else{
//         setRole("not logged in");
//       }
//     })
//   }, []);

  
//   return(
    

//     <div className="App">
//       <Navigation/>
//       {role}
//       <h1>Insert new events</h1>

//       <div className="inputBoxesEvents">
        

//       {isAdmin ? //if the person is a admin role, then render the input boxes
//       <React.Fragment>
//         <div className = "input_events_container">
//           <div className = "event_name inner_container">
//             <p>Event name:</p> <input type="text" />
//           </div>
//           <div className = "event_description inner_container">
//             <p>Event description:</p> <input type="text" />
//           </div>
//           <div className = "event_location inner_container" >
//             <p>Event location:</p> <input type="text" />
//           </div>

//         </div>
//         </React.Fragment>
//         :
//         null
//       }


//       </div>

      // <table id="events">
      //   <tr>
      //     <th>event_id</th>
      //     <th>date</th>
      //     <th>start time</th>
      //     <th>end time</th>
      //     <th>event name</th>
      //     <th>description</th>
      //     <th>location</th>
      //     <th>club hosting</th>
      //     <th>event type</th>
          
      //   </tr>
        // {eventList.map((val)=>{
        //     return (
        //     <tr>
        //       <td>{val.event_id}</td>
        //       <td>{val.date}</td>
        //       <td>{val.start_time}</td>
        //       <td>{val.end_time}</td>
        //       <td>{val.event_name}</td>
        //       <td>{val.event_description}</td>
        //       <td>{val.event_location}</td>
        //       <td>{val.club_name}</td>
        //       <td>{val.keyword_name}</td>
        //     </tr>

        //     );
        //   })}
      // </table>
//     </div>
//   );

// }

