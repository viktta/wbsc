import React, { Component } from 'react';
import Register from './User/Register';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Login from './User/Login';
import axiosInstance from './axiosApi';
class App extends Component {

    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogout() {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            return response;
        }
        catch (e) {
            console.log(e);
        }
    };
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <Link className={"nav-link"} to={"/"}>Home</Link>
                        <Link className={"nav-link"} to={"/login/"}>Login</Link>
                        <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
                        <button onClick={this.handleLogout}>Logout</button>
                    </nav>
                    <main>
                        <Switch>
                            <Route exact path={"/signup/"} component={Register} />
                            <Route exact path={"/login/"} component={Login} />
                            <Route path={"/"} component={Home} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
}

export default App;





class Home extends Component {
    state = {}
    render() {
        return (
            <h1>Welcome to the home Page</h1>
        );
    }
}
