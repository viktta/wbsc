import React, { Component } from "react";
import axios from "axios";
class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      name: "",
      user: localStorage.getItem("user_id"),
      urls: [],
      id: "",
    };
    this.deleteUrl = this.deleteUrl.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  deleteUrl(e) {
    const id = this.state.id;
    const url = this.state.url;
    axios.delete(`http://localhost:8000/api/urls/edit/${id}`, {
      url,
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
    const url = urls.map(function (items) {
      return (
        <li key={items.id} className='delete-lists'>
          name: {items.name} <br /> url: {items.url} <br /> id: {items.id}
        </li>
      );
    });
    return (
      <div className='delete-grid'>
        <p className='delete-p'>Here you can delete urls</p>
        <form onSubmit={this.deleteUrl} className='delete-inputs'>
          <input
            name="id"
            value={this.state.id}
            onChange={this.handleChange}
            placeholder="id of url"
            className='delete-id'
          ></input>
          <input
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
            placeholder="url name"
            className='delete-url'
          ></input>
          <button type="submit" className='delete-button'>delete</button>
        </form>
        <ul>{url}</ul>
      </div>
    );
  }
}

export default Delete;
