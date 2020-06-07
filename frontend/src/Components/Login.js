import React, { Component } from "react";
import axiosInstance from './axiosApi'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount() {
        const {username, password} = this.state;
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        const localstorageusername = localStorage.setItem('username', username);
        const localstoragepassword = localStorage.setItem('password', password);
        console.log(localstorageusername);
        console.log(localstoragepassword);
    }

    async handleSubmit(event) {
        try {
            const data = await axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            });
            axiosInstance.defaults.headers['Authorization'] = "JWT " + data.access;
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            return data;
        } catch (error) {
            throw error;
        }
    }

    render() {
        return (
            <div>
                Login
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
export default Login;