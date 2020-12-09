import React from 'react';
import './Section.scss';

const Section=(props)=>(
  <div className="section-container" >
    <div className="about-page">
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
      <div className="about-footer">
        <div className="section-bottom">
          <div className="section-title">
            {props.mission_title}
          </div>
          <div className="section-body">
            {props.mission}
          </div>
        </div>
      </div>
    </div>
  </div>

);

export default Section;