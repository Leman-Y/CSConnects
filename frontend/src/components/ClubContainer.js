import React from 'react';
import './ClubContainer.scss';

const ClubContainer = (props) =>{
  return(
      <div className="wrapper">
        {props.children}
      </div>
  );
}

export default ClubContainer;