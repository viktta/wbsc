import React, { Component } from "react";
import Register from "./User/Register";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import LinkSaver from "./Link_saver";
import Edit from "./routes/edit";
import Delete from "./routes/delete";
import Login from "./User/login";
import "./styles/main.css";
import axiosInstance from "./axiosApi";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      access_token: localStorage.getItem("access_token"),
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.setState({
      username: localStorage.getItem("username"),
    })
  }

  async handleLogout() {
    try {
      const response = await axiosInstance.post("/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      localStorage.removeItem("is_superuser");
      localStorage.removeItem("date_joined");
      localStorage.removeItem("is_staff");
      localStorage.removeItem("_lr_id_");
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_login");
      localStorage.removeItem("email");
      localStorage.removeItem("last_name");
      localStorage.removeItem("password");
      axiosInstance.defaults.headers["Authorization"] = null;
      window.setTimeout(() => {
        window.history.go(0);
      }, 1000);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <Router>
        <div>
          {this.state.access_token ? (
            <nav className="nav-var">
              <ul className="Nav-Links">
                <li>
                  <Link
                    onClick={this.handleLogout}
                    className="nav-link-logout"
                    type="button"
                  >
                    Logout
                  </Link>
                </li>
                <li>
                  <Link className={"nav-link-home"} to={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <h1 className={"nav-link-username"}>
                    username: {this.state.username}
                  </h1>
                </li>
              </ul>
            </nav>
          ) : (
            <nav className="nav-var">
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
                  <Link className="nav-link-login" to={"/login/"}>
                    Login
                  </Link>
                </li>
                <li>
                  <h1 className={"nav-link-username"}>
                    username: {this.state.username}
                  </h1>
                </li>
              </ul>
            </nav>
          )}

          <main>
            <Switch>
              <Route exact path={"/signup/"} component={Register} />
              <Route exact path={"/"} component={Home} />
              <Route exact path={"/edit/"} component={Edit} />
              <Route exact path={"/delete/"} component={Delete} />
              <Route exact path={"/login/"} component={Login}></Route>
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
      <div className="home-class-div">
        <h1 className="home-h1">Welcome to Link Saver</h1>
        <p className="home-p">
          for this website to work
          <br />
          you need to signup or login
        </p>
        <p className="home-p1">
          make you are saving a <br />
          full link (e.p https://youtube.com)
        </p>
        <LinkSaver className='link-saver-grid-home'/>
      </div>
    );
  }
}
