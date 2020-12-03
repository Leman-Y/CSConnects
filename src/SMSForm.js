import React, { Component } from 'react';
import Navigation from './components/Navigation'
import './components/SignUp.scss';
import { Button } from 'antd';


import Computer from './images/comp.svg';
import burger from './images/burger.svg';
import Section from './components/Section';
import about from './images/about.png';

class SMSForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          message: {
            to: '',
            body: '',
            name:''
          },
          submitting: false,
          error: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
      }
    onSubmit(event) {
        event.preventDefault();
        this.setState({ submitting: true });
        fetch('http://localhost:3001/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
            
          },
          body: JSON.stringify(this.state.message)
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              this.setState({
                error: false,
                submitting: false,
                message: {
                  to: '',
                  body: ''
                }
              });
            } else {
              this.setState({
                error: true,
                submitting: false
              });
            }
          });
      }
    
      onHandleChange(event) {
        const name = event.target.getAttribute('name');
        this.setState({
          message: { ...this.state.message, [name]: event.target.value }
        });
      }
    render() {
        return (
          <div>
             <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
          <form onSubmit = {this.onSubmit} className={this.state.error ? 'error in sms-form' : 'sms-form'}>
            <div>
              <h1>Testing Twilio Text</h1>
              <label htmlFor="to">Phone number (Example: +15166951142)</label>
              <input
                 type="tel"
                 name="to"
                 id="to"
                 value={this.state.message.to}
                 onChange={this.onHandleChange}
              />
            </div>
            {/* <div>
              <label htmlFor="name">Your Name:</label>
              <textarea name="name" id="name" value={this.state.message.name} onChange={this.onHandleChange}/>
            </div> */}

            <div>
              <label htmlFor="body">Body:</label>
              <textarea name="body" id="body" value={this.state.message.body} onChange={this.onHandleChange}/>
            </div>
            <div className="button-container">
            <button type="submit" disabled={this.state.submitting}>
              Send message
            </button>
            </div>
          </form>
          </div>
        );
      }
}

export default SMSForm;