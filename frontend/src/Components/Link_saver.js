import React, { Component } from "react";
import axios from "axios";

class LinkSaver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      user: localStorage.getItem("id"),
      urls: localStorage.getItem("url"),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    const { url, user } = this.state;
    axios.post("http://127.0.0.1:8000/api/urls/", {
      url,
      user,
    });
  }

  componentDidMount() {
    const user = this.state.user;
    axios.get("http://127.0.0.1:8000/api/urls/" + user).then((res) => {
      localStorage.setItem("url", JSON.stringify(res.data));
    });
  }

  render() {
    const urls = this.state.urls;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
            placeholder="add url"
          ></input>
          <button type="submit">add</button>
        </form>
        <ul>
          <li>{urls}</li>
        </ul>
      </div>
    );
  }
}

export default LinkSaver;
