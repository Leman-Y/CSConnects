import React from 'react';
import Axios from 'axios'; //using axios to do api calls
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Navigation from '../components/Navigation';
import '../styles/events.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {Form, Button} from 'react-bootstrap/';
import DatePicker from 'react-date-picker'; //for the date picker package
import TimePicker from 'react-time-picker'; //for the time picker package
import { useForm } from "react-hook-form"; //for the form validation package
 



Axios.defaults.withCredentials = true;
/*
 Get all events from database and then puts the the events into the correct object type to pass into Fullcalendar.
 Relevant doc: https://fullcalendar.io/docs/v3/events-array
 */
async function getAllEventsFromDb() {
    const arr =  await Axios.get('http://localhost:3001/api/getEvents').then((response) =>
        response.data
    ).catch(err => {
            console.log(err);
        }
    )
    // console.log('arr ', arr);

    const jsonArr = [];

    arr.map( (val) =>
        {
            jsonArr.push({
                title: val.event_name,
                date: val.date
            })
        });

    //console.log('jsonArr: ', jsonArr)

    return jsonArr;
}

const club_names= [
    'Hunter ACM', 'Open Source', 'Women in cs' , 'Apps club'
];

const event_types= []; //will be populated once page loads and if user is an admin role
var defaultClub = club_names[0];
var defaultEventType = event_types[0];

// const { register } = useForm();


export default class DemoApp extends React.Component {

    state = {
        role : false,
        date: new Date(),
        start_time: new Date(),
        end_time: '',
        event_name: '',
        event_description: '',
        event_location: '',
        club_name: defaultClub,
        event_type: '',
        error_message: ''

    }

    componentDidMount() { //makes it so that as soon as the page loads, run the function below that checks if user is an admin
        Axios.get("http://localhost:3001/login").then((response)=>{
            if(response.data.loggedIn == true){
                if(response.data.user[0].role == 'admin'){
                    this.setState({
                        role: true,
                        date: new Date()
                    })
                    Axios.get('http://localhost:3001/api/getEventType').then((response)=>{
                        console.log(response.data);
                        response.data.map( (val) =>
                        {
                            event_types.push(val.keyword_name);
                            
                        });

                    })

                }
            }
        })
    }


    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
        // Axios.get('http://localhost:3001/api/getEvents').then((response)=>{
        //     console.log(response.data);
        // })
    }

    dates = '[{"title": "event1", "date": "2020-11-02"},{"title": "event2","date": "2020-11-04"}]';
    eventArray = JSON.parse(this.dates);

    handleClubClick = (event) =>{
        this.setState({
            date: event
        })
    }


    handleEventSubmit = (event) =>{
        if(this.state.event_name == ''){
            this.setState({
                error_message: "Please enter a event name"
            })
        }else if(this.state.event_description == ''){
            this.setState({
                error_message: "Please enter a event description"
            })
        }else if(this.state.event_location == ''){
            this.setState({
                error_message: "Please enter a event location"
            })
        }else{
            this.setState({
                error_message: ""
            })
            Axios.post('http://localhost:3001/api/insertEvent', { //makes an API call from the backend server from this specific URL. 
            date: this.state.date.getFullYear() + "-" + (this.state.date.getMonth()+1) + "-" + this.state.date.getDate(),
            start_time: this.state.start_time,
            end_time: this.state.end_time,
            event_name: this.state.event_name,
            event_description: this.state.event_description,
            event_location: this.state.event_location,
            club_name: this.state.club_name,
            event_type: this.state.event_type
            }).then((response)=>{
                this.setState({
                    error_message: 'successfully inserted'
                })
            });
            }
        // console.log(event);
        event.preventDefault();
    }
    
    render() {
        return (
        <div>
            <Navigation/>
            <div className="main_container">
                <div className="calendar_container" style={{width: "50vw"}}>  
                    <FullCalendar 
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        dateClick={this.handleDateClick}
                        events={getAllEventsFromDb}
                    />
                </div>
                <div className="eventInfo_container">


                </div>
            </div>
            {this.state.role ?
                <React.Fragment>
                    
                    <form onSubmit={this.handleEventSubmit}>
                        <div className="error_container">
                            <p style={{color: "black"}}>Panel to insert new events</p>
                            <p>{this.state.error_message}</p>
                        </div>
                    
                    <div className = "admin_container">
                    
                            {/* <p>{this.state.club_name}</p>
                            <p>{this.state.date.getFullYear() + "-" + (this.state.date.getMonth()+1) + "-" + this.state.date.getDate()}</p>
                            <p>{this.state.event_type}</p>
                            <p>{this.state.start_time}</p>
                            <p>{this.state.end_time}</p> */}
                            <div className = "admin_left_container">
                                <Form.Group >
                                    <Form.Label>Event Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Event Name" onChange={(e)=>{
                                        this.setState({
                                            event_name: e.target.value
                                        })
                                    }}/>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Event Description</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Event Description" onChange={(e)=>{
                                        this.setState({
                                            event_description: e.target.value
                                        })
                                    }}/>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Event Location</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Event Location" onChange={(e)=>{
                                        this.setState({
                                            event_location: e.target.value
                                        })
                                    }}/>
                                </Form.Group>
                            </div>

                            <div className = "admin_right_container">
                                <div className="club_container inner_container">
                                    <label>Which club is hosting this event?</label>
                                    <Dropdown className="event_type_dropdown" options={club_names} onChange={club_name=> this.setState({club_name: club_name.value})} value={defaultClub} placeholder="Select an option" />
                                </div>

                                <div className="event_type_container inner_container">
                                    <label>What kind of event is this?</label>
                                    <Dropdown className="event_type_dropdown" options={event_types} onChange={event_type=> this.setState({event_type: event_type.value})} value={defaultEventType} placeholder="Select an option" />
                                </div>

                                <div className="date_container inner_container">
                                    <label>Choose Date of event </label>
                                    <DatePicker 
                                    value={this.state.date} //this is what is inside the input of the date 
                                    // onChange={date => this.setState({date: date})} //when you change the date, update state
                                    onChange={this.handleClubClick} //when you change the date, update state
                                    // format='y-MM-dd'
                                    format='y-MM-dd'
                                    
                                    minDate={new Date()} //makes it so you can't choose dates before current date
                                    required
                                    />
                                </div>

                                <div className="time_start_container inner_container">
                                    <label>What time does the event start? </label>
                                    <TimePicker
                                    onChange={start_time => this.setState({start_time: start_time})}
                                    value={this.state.start_time}
                                    minTime={new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}
                                    />
                                </div>

                                <div className="time_end_container inner_container">
                                    <label>What time will the event end? </label>
                                    <TimePicker
                                    onChange={end_time => this.setState({end_time: end_time})}
                                    value={this.state.end_time}
                                    // minTime={this.state.start_time.getHours() + ':' + this.state.start_time.getMinutes() + ':' + this.state.start_time.getSeconds()}
                                    />
                                </div>
                            </div>


                    </div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </form>
                </React.Fragment>
            :
                null
            }

        </div>
        )
    }

}
