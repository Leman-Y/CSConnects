import React from 'react';
import './linkContainer.scss';

const LinkContainer = (props) =>{
  return(
    <div>
      <div className="link-wrapper">
        {props.children}
      </div>
    </div>
  );
}

export default LinkContainer;