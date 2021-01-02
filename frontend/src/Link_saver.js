import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/main.css";
class LinkSaver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      name: "",
      user: localStorage.getItem("user_id"),
      urls: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    const { url, user, name } = this.state;
    axios
      .post("http://127.0.0.1:8000/api/urls/", {
        url,
        name,
        user,
      })
      .then(() => {
        window.setTimeout(() => {
          window.history.go(0);
        }, 1000);
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
              <a href={items.url} className="url1">
                {items.name}
              </a>
            </th>
            <th>
              <button>
                <Link to={"/edit/"} className="url-rename">
                  rename
                </Link>
              </button>
            </th>
            <th>
              <button>
                <Link to={"/delete/"} className="url-delete">
                  delete
                </Link>
              </button>
            </th>
          </tr>
        </thead>
      );
    });
    return (
      <div className="link-saver-grid">
        <form onSubmit={this.handleSubmit}>
          <input
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
            placeholder="add url"
            className="url-adder"
          ></input>
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="add url name"
            className="url-name"
          ></input>
          <button type="submit" className="url-button-add">
            add
          </button>
        </form>
        <table id="table" className="url-list">
          {url2}
        </table>
      </div>
    );
  }
}

export default LinkSaver;
