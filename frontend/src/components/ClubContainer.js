import React from 'react';
import './ClubContainer.scss';

const ClubContainer = (props) =>{
  return(
    <div className="club-container">
      <div className="club-title">
        {props.title}
      </div>
      <div className="wrapper">
        {props.children}
      </div>
    </div>
  );
}

export default ClubContainer;