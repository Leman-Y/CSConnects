import React from 'react';
import './Section.scss';

const Section=(props)=>(
  <div className="section-container" >
    <div className="section-top">
      <div className="section-title">
        {props.about_title}
      </div>
      <div className="section-body">
        {props.about}
      </div>
      <div className="section-body">
        {props.about2}
      </div>
    </div>
    <img alt="woman working on her computer" className="section-img" src = {props.img}/>
    <div className="section-bottom">
      <div className="section-title">
        {props.mission_title}
      </div>
      <div className="section-body">
        {props.mission}
      </div>
    </div>
  </div>

);

export default Section;