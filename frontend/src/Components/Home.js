import React, { Component} from "react";
import { Switch, Route, Link , BrowserRouter, Redirect} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import axiosInstance from './axiosApi.js';
import '../styles/main.css';
import axios from 'axios';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            link: '',
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createLink = this.createLink.bind(this)
    }



    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    createLink(event) {
        event.preventDefault()
        const {link} = this.state;
        const newDiv = document.createElement("div");
        const newContent =document.createTextNode({link});
        newDiv.appendChild(newContent);
        document.body.insertBefore(newDiv, currentDiv); 
        var currentDiv = document.getElementById("a");
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
        const {link} = this.state;
        return (
            <div className="site">
                <nav className="nav-var">
                    <BrowserRouter>
                    <Link className={"nav-link"} id="home-link" to={"/"}>Home</Link>
                    <Link className={"nav-link"} id="login-link" to={"/login"}>Login</Link>
                    <Link className={"nav-link"} id="signup-link" to={"/signup"}>Signup</Link>
                    <button onClick={this.handleLogout}>Logout</button>
                    </BrowserRouter>
                </nav>
                <main className="Main">
                    <BrowserRouter>
                    <Switch>
                        <Route exact path={"/login"} component={Login}/>
                        <Route exact path={"/signup"} component={Signup}/>
                        <Route path={"/"}/>
                   </Switch>
                    </BrowserRouter>
               </main>
               <div className="save-links">
                   <form onSubmit={this.createLink}>
                       <label>
                    <input className="link-adder" name='link' id="a" type="text" value={link} onChange={this.handleChange}></input>
                       </label>
                    <button className="link-submitter" type="submit">submit</button>
                    
                   </form>
               </div>
            </div>
        );
    }
}

export default Home;