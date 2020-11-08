import React from 'react';
import './Section.scss';

const SmallSection=(props)=>(
  <div className="section-container" >
      <div className="section-title">
        <a href={props.link}>
          {props.title}
        </a>
      </div>
      <div className="section-des">
        {props.about}
      </div>
  </div>

);

export default SmallSection;