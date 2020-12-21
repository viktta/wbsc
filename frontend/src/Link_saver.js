import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class LinkSaver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
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
    const url2 = urls.map(function (items) {
      return (
        <thead key={items.id}>
          <tr>
            <th>
              <a href={items.url}>{items.name}</a>
            </th>
            <th>
              <button>
                <Link to={"/edit/"}>rename</Link>
              </button>
            </th>
            <th>
              <button>delete</button>
            </th>
          </tr>
        </thead>
      );
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
        <table id="table">{url2}</table>
      </div>
    );
  }
}

export default LinkSaver;
