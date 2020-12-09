import React from 'react';
import './ClubPages.scss';

const ClubPages = (props) =>{
  return(
    <div className="cp-container">
      <div className="cp-flex">
        <div className="club-logo">
          <img alt= {`${props.club} logo`} src={props.image}></img>
        </div>
        <div className="club-info">
          <h4>Learn about {props.club}</h4>
          <hr></hr>
          <p>{props.des}</p>
          <p>{props.des2}</p>
          <p>{props.time}</p>
          
        </div>
      </div>
    </div>
  );
}

export default ClubPages;