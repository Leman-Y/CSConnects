import React from 'react';
import Navigation from '../components/Navigation';
import Computer from '../images/comp.svg';
import burger from '../images/burger.svg';
import '../styles/Home.scss';
import '../styles/themes.scss';
import SmallSection from '../components/SmallSection';
import '../styles/contact.scss';
import Contact from '../components/Contact';

function ContactPage() {
  return (
    <div className="App">
      <div className="NavBar">
        <Navigation icon={Computer} name="CSConnects" burger={burger}/>
      </div>
      <div className="contact-container">
        <SmallSection title="Contact Us" about="Email us with any questions, concerns or suggestions. We'll get back to you as soon as possible!"></SmallSection>
        <Contact/>
        {/* <form action="https://formspree.io/f/xgepnelk" method="POST">
          <div class="form-group row">
            <div class="col-md-6">
                <input class="form-control" type="text" name="name" placeholder="Name" required></input>
            </div>

            <div class="col-md-6">
                <input class="form-control" type="email" name="_replyto" placeholder="E-mail Address" required></input>
            </div>
          </div>

          <div class="form-group">
            <input class="form-control" type="text" name="subject" placeholder="Subject" required></input>
          </div>

          <textarea rows="8" class="form-control mb-3" name="message" placeholder="Message" required></textarea>

          <input class="btn btn-success" type="submit" value="Send"></input>

        </form> */}
      </div>
    </div>
  );
}

export default ContactPage;
