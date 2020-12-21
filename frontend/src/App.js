import React, { Component } from "react";
import Register from "./User/Register";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import LinkSaver from "./Link_saver";
import Edit from "./routes/edit";
import "./styles/main.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.setState({
      username: localStorage.getItem("username"),
    });
  }

  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("last_name");
    localStorage.removeItem("first_name");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("id");
  }

  render() {
    return (
      <Router>
        <div>
          <ul className="Nav-Links">
            <li>
              <Link className={"nav-link-home"} to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className={"nav-link-signup"} to={"/signup/"}>
                Signup
              </Link>
            </li>
            <li>
              <button onClick={this.logout} className="logoutbutton">
                Logout
              </button>
            </li>
            <li>
              <h1 className={"nav-link-username"}>
                username: {this.state.username}
              </h1>
            </li>
          </ul>
          <main>
            <Switch>
              <Route exact path={"/signup/"} component={Register} />
              <Route exact path={"/"} component={Home} />
              <Route exact path={"/edit/"} component={Edit} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Welcome to the home Page</h1>
        <LinkSaver />
      </div>
    );
  }
}
