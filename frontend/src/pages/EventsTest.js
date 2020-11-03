import React from 'react';
import Axios from 'axios'; //using axios to do api calls
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Navigation from '../components/Navigation';


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
    console.log('arr ', arr);

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


export default class DemoApp extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         eventList: []
    //     }
    // }



/*
    Example event object to pass into events prop for Fullcalendar
                events={[
                    { title: 'Pool', date: '2020-11-01' },
                    { title: 'event 2', date: '2020-11-02' }
                ]}
 */

    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
        // Axios.get('http://localhost:3001/api/getEvents').then((response)=>{
        //     console.log(response.data);
        // })
    }

    dates = '[{"title": "event1", "date": "2020-11-02"},{"title": "event2","date": "2020-11-04"}]';
    eventArray = JSON.parse(this.dates);

//style = {{width: "810px"}}
/*
To show submit event form if user is admin
                {isAdmin ?
                <React.Fragment>
                    <p>whatever</p>
                </React.Fragment> : null}
 */

    render() {
        return (
        <div>
            <Navigation/>
            <div style = {{width: "810px"}}>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    dateClick={this.handleDateClick}
                    events={getAllEventsFromDb}
                />
            </div>
        </div>
        )
    }

}
