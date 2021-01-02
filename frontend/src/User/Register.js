import React, { Component } from "react";
import axios from "axios";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit(e) {
    const { username, email, password } = this.state;
    axios
      .post("http://127.0.0.1:8000/api/users/", {
        username,
        email,
        password,
      })
      .then(() => {
        window.setTimeout(() => {
          window.history.go(0);
        }, 1000);
      });
  }

  render() {
    return (
      <div className='Register'>
        <h1 className='register-form'>Register</h1>
        <form onSubmit={this.handleSubmit} className="user-form">
          <input
            className="input-username"
            value={this.state.username}
            name="username"
            onChange={this.handleChange}
            placeholder="enter username"
            type="text"
          ></input>
          <input
            className="input-email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
            placeholder="enter email"
            type="email"
          ></input>
          <input
            className="input-password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
            placeholder="enter password"
            type="password"
          ></input>
          <button type="submit" className="button-sign-up">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
export default Register;
