import React from 'react';
import './ClubCard.scss';

const ClubCard = (props) =>(
  <div>
    <div className="Clubs-container" style={{'--image': `url(${props.image})`}}>
    </div>
  </div>
);

export default ClubCard;