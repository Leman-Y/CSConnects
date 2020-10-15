import React from 'react';
import './IconContainer.scss';

const IconContainer = (props) =>{
  return(
    <div>
      <div className="icon-title">
        {props.title}
      </div>
      <div className="icon-wrapper">
        {props.children}
      </div>
    </div>
  );
}

export default IconContainer;