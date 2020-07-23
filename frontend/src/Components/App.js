import React, { Component } from 'react';
import Register from './User/Register';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Login from './User/Login';
import LinkSaver from './Link_saver';
import './styles/main.css';


class App extends Component {

constructor(props) {
    super(props);
    this.state = {
        username: ''
    }
}

componentDidMount() {
    this.setState({
        username: localStorage.getItem('username')
    })
}

    render() {
        return (
            <Router>
                <div>
                    <nav className="Nav-Links">
                        <Link className={"nav-link-home"} to={"/"}>Home</Link>
                        <Link className={"nav-link-signup"} to={"/signup/"}>Signup</Link>
                        <Link className={"nav-link-login"} to={"/login/"}>Login</Link>
                        <h1>username: {this.state.username}</h1>
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
            <div>
                <h1>Welcome to the home Page</h1>
                <LinkSaver />
            </div>
        );
    }
}
