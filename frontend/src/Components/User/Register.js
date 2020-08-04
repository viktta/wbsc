import React, { Component } from "react";
import axios from "axios";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
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
    const { username, first_name, last_name, email, password } = this.state;
    axios.post("http://127.0.0.1:8000/api/users/", {
      username,
      first_name,
      last_name,
      email,
      password,
    }).then(res => {
      localStorage.setItem('id', res.data.id);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('first_name', res.data.first_name);
      localStorage.setItem('last_name', res.data.last_name);
      localStorage.setItem('email', res.data.email);
      localStorage.setItem('password', res.data.password);
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.username}
            name="username"
            onChange={this.handleChange}
            placeholder="enter username"
            type="text"
          ></input>
          <input
            value={this.state.first_name}
            name="first_name"
            onChange={this.handleChange}
            placeholder="enter first name"
            type="text"
          ></input>
          <input
            value={this.state.last_name}
            name="last_name"
            onChange={this.handleChange}
            placeholder="enter last name"
            type="text"
          ></input>
          <input
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
            placeholder="enter email"
            type="email"
          ></input>
          <input
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
            placeholder="enter password"
            type="password"
          ></input>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default Register;
