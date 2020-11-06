import React from 'react';
import './Panel.scss';

function OpenPanel(id){
  var x = document.getElementById(id);
  if (x.className === "panel-children") {
    x.className += " shown";
  } else {
    x.className = "panel-children";
  }
}

const Panel = (props) =>{
  return(
    <div className="panel-container" >
      <div className="accordian">
        <div className="panel-title">
          {props.title}
        </div>
        <img className="panel-icon" src={props.icon} onClick={() => OpenPanel(props.id)}>
        </img>
      </div>
      <div id={props.id} className="panel-children">
        <div>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Panel;