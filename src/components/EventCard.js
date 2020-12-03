import React from 'react';
import './EventCard.scss';

const EventCard = (props) =>(
  <div>
    <div className="event-container">
      <div className="event-image">
        <img src={props.image}/>
      </div>
      <div className="event-info">
        <div className="event-title">
        {props.title}
        </div>
        <div className="line"/>
        <div>
        Time: {props.time}
        </div>
      </div>
    </div>
  </div>
);

export default EventCard;