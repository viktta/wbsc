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

    handleSubmit() {
        axiosInstance.post('/token/obtain/', {
            username: this.state.username,
            password: this.state.password
        }).then(
            request => {
                localStorage.setItem('username', request.data.username);
            }
        )
            .then(
                result => {
                    axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                    localStorage.setItem('access_token', result.data.access);
                    localStorage.setItem('refresh_token', result.data.refresh);
                }
            ).catch(error => {
                throw error;
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
                <h1>username: {localStorage.getItem('username')}</h1>
            </div>
        );
    }
}

export default Login;