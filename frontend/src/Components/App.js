import React, { Component } from 'react';
import Register from './User/Register';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axiosInstance from './axiosApi';
import Login from './User/Login';
import LinkSaver from './Link_saver';
import './styles/main.css';
import { Provider } from 'react-redux';
import store from '../Store/store.js'


class App extends Component {
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
            <Provider store={store}>
            <Router>
                <div>
                    <nav className="Nav-Links">
                        <Link className={"nav-link-home"} to={"/"}>Home</Link>
                        <Link className={"nav-link-signup"} to={"/signup/"}>Signup</Link>
                        <Link className={"nav-link-login"} to={"/login/"}>Login</Link>
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
            </Provider>
        );
    }
}

export default App;





class Home extends Component {
    state = {}
    render() {
        return (
            <div>
                <h1>Welcome to the home Page</h1>
                <LinkSaver />
            </div>
        );
    }
}
