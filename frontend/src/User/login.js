import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "../styles/main.css";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: localStorage.getItem("refresh_token"),
      user_info_data: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getUserId(e) {
    const token = localStorage.getItem("refresh_token");
    const decode = jwt_decode(token);
    localStorage.setItem("user_id", decode.user_id);
  }

  componentDidMount() {
    const username = localStorage.getItem("username");
    if (username) {
      //pass
    } else {
      this.getUserInfo();
    }
    
  }

  getUserInfo(e) {
    const id = localStorage.getItem("user_id");
    axios
      .get("http://127.0.0.1:8000/api/users/" + id)
      .then((res) => {
        const username = res.data.map((username) => {
          return username.username;
        });
        const password = res.data.map((password) => {
          return password.password;
        });
        const last_login = res.data.map((last_login) => {
          return last_login.last_login;
        });
        const is_superuser = res.data.map((is_superuser) => {
          return is_superuser.is_superuser;
        });
        const first_name = res.data.map((first_name) => {
          return first_name.first_name;
        });
        const last_name = res.data.map((last_name) => {
          return last_name.last_name;
        });
        const email = res.data.map((email) => {
          return email.email;
        });
        const is_staff = res.data.map((is_staff) => {
          return is_staff.is_staff;
        });
        const is_active = res.data.map((is_active) => {
          return is_active.is_active;
        });
        const date_joined = res.data.map((date_joined) => {
          return date_joined.date_joined;
        });
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("last_login", last_login);
        localStorage.setItem("is_superuser", is_superuser);
        localStorage.setItem("first_name", first_name);
        localStorage.setItem("last_name", last_name);
        localStorage.setItem("email", email);
        localStorage.setItem("is_staff", is_staff);
        localStorage.setItem("is_active", is_active);
        localStorage.setItem("date_joined", date_joined);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    axiosInstance
      .post("/token/obtain/", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((result) => {
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + result.data.access;
        localStorage.setItem("access_token", result.data.access);
        localStorage.setItem("refresh_token", result.data.refresh);
      })
      .then(() => {
        this.getUserId();
      })
      .then(() => {
        window.setTimeout(() => {
          window.history.go(0);
        }, 1000);
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    return (
      <div className='login-grid'>
        <h1 className='Login-user' >Login</h1>
        <form onSubmit={this.handleSubmit} className="login-form">
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Enter Username"
              className='login-username'
            />
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Enter Password"
              className='login-password'
            />
          <input type="submit" value="Submit" className='login-submit' />
        </form>
      </div>
    );
  }
}
export default Login;
