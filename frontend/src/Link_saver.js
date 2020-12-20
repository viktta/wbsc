import React, { Component } from "react";
import axios from "axios";

class LinkSaver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url1: "",
      name: "",
      user: localStorage.getItem("id"),
      urls: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit() {
    const { url, user, name } = this.state;
    axios.post("http://127.0.0.1:8000/api/urls/", {
      url,
      name,
      user,
    });
  }

  componentDidMount() {
    const user = this.state.user;
    axios.get("http://127.0.0.1:8000/api/urls/" + user).then((res) => {
      this.setState({
        urls: res.data,
      });
    });
  }

  render() {
    const urls = this.state.urls;
    urls.forEach(function (item) {
      const table = document.getElementById("table");

      const type = document.createElement("tbody");
      type.textContent = item.name;

      const link = document.createElement("a");
      link.textContent = item.url;
      link.href = item.url;

      table.appendChild(type);
      table.appendChild(link);
      
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
            placeholder="add url"
          ></input>
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="add name"
          ></input>
          <button type="submit">add</button>
        </form>
        <div></div>
        <table id="table">
          
        </table>
      </div>
    );
  }
}

export default LinkSaver;
