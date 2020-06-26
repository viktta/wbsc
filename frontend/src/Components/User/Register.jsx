import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_reg: {
                username: '',
                email: '',
                password: '',
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.name });
    }

    handleSubmit(event) {
        event.preventDefault();

        const user = {
            username: this.state.user_reg.username,
            email: this.state.user_reg.email,
            password: this.state.user_reg.password,
        };

        axios.post('http://127.0.0.1:8000/api/user/create/', { user })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="email" onChange={this.handleChange} placeholder="enter email" type="email"></input>
                    <input name="username" onChange={this.handleChange} placeholder="enter username" type="text"></input>
                    <input name="password" onChange={this.handleChange} placeholder="enter password" type="password"></input>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default Register;