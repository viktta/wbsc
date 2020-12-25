import React, { Component } from "react";
import axios from "axios";
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      name: "",
      id: "",
      user: localStorage.getItem("id"),
      urls: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.renameUrl = this.renameUrl.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renameUrl(e) {
    const user = this.state.user;
    const id = this.state.id;
    const { url, name } = this.state;
    axios.put(`http://localhost:8000/api/urls/edit/${id}/`, {
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
    const url1 = urls.map(function (items) {
      return (
        <li key={items.id}>
          name: {items.name} <br /> url: {items.url} <br /> id: {items.id}
        </li>
      );
    });
    return (
      <div>
        <form onSubmit={this.renameUrl}>
          <input
            name="id"
            value={this.state.id}
            onChange={this.handleChange}
            placeholder="id of the site"
          ></input>
          <br />
          <br />
          <input
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
            placeholder="rename url"
          ></input>
          <br />
          <br />
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="change name"
          ></input>
          <br />
          <br />
          <button type="submit">rename</button>
        </form>
        <ul>{url1}</ul>
      </div>
    );
  }
}

export default Edit;
