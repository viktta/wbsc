import React, { Component } from "react";
import axios from "axios";

class LinkSaver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
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
    const { url, user } = this.state;
    axios.post("http://127.0.0.1:8000/api/urls/", {
      url,
      user,
    });
  }

  componentDidMount() {
    const user = this.state.user;
    axios.get("http://127.0.0.1:8000/api/urls/" + user).then((res) => {
      this.setState({
        urls: res.data
      })
    });
  }


  render() {
    const urls = this.state.urls;
    const urlsMap = urls.map((url) => {
    return <a href=''><li>{url.url}</li></a>
    })
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
          {urlsMap}
        </ul>
      </div>
    );
  }
}

export default LinkSaver;
