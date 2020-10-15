import React from 'react';
import './Icon.scss';

const Icon=(props)=>(
  <div className="icon-container">
    <div className="icon-img">
      <img src={props.icon}/>
    </div>
    <div className="icon-des">
      {props.des}
    </div>
  </div>

);

export default Icon;
