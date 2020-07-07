import React, { Component } from 'react';
import axiosInstance from '../axiosApi';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        axiosInstance.get('/user/', {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            console.log(res)
            console.log(res.body)
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.username} name="username" onChange={this.handleChange} placeholder="enter username" type="text"></input>
                    <input value={this.state.password} name="password" onChange={this.handleChange} placeholder="enter password" type="password"></input>
                    <button type="submit">Log In</button>
                </form>
            </div>
        );
    }
}

export default Login;