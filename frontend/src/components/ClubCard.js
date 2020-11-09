import React from 'react';
import './ClubCard.scss';

function showText(id){
  var x = document.getElementById(id);
  x.style.visibility = 'visible';
}
function hideText(id){
  var x = document.getElementById(id);
  x.style.visibility = 'hidden';
}

const ClubCard = (props) =>(
  <div id="club" className="club-hover" onMouseEnter={() => showText(props.id)} onMouseLeave={() => hideText(props.id)} >
    <div id={props.id} className="text-container">
      <div className="club-text">
        {props.des}
        <div className="club-link">
          <a href={props.link} rel="noreferrer" target="_blank">Read More</a>
        </div>
      </div>
    </div>
    <div className="Clubs-container" style={{'--image': `url(${props.image})`}}>
    </div>
  </div>
);

export default ClubCard;