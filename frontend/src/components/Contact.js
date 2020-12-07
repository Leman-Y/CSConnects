import React from "react";

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: ""
    };
  }

  render() {
    const { status } = this.state;
    return (
      <form
        onSubmit={this.submitForm}
        action="https://formspree.io/f/xgepnelk"
        method="POST"
      >
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
        {status === "SUCCESS" ? <p>Thanks!</p> :  <input class="btn btn-success" type="submit" value="Send"></input>}
        {status === "ERROR" && <p>Ooops! There was an error.</p>}
      </form>
    );
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}