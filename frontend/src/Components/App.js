import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    state = {}
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <Register />
            </div>
        );
    }
}

export default App;



class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_reg: {
                username: '',
                password: '',
                email: '',
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/user/create/', {
            username: this.state.user_reg.username,
            email: this.state.user_reg.email,
            password: this.state.user_reg.password,
        })
            .then(res => {
                console.log(res)
                console.log(res.data)
            })
    }

    handleChange = event => {
        this.setState({ name: event.target.value });
    }

    render() {
        const { email, username, password } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <input name='email' value={email} type='email' onChange={this.handleChange} placeholder='email'></input>
                <input name='username' value={username} type='text' onChange={this.handleChange} placeholder='username'></input>
                <input name='password' value={password} type='password' onChange={this.handleChange} placeholder='password'></input>
                <button type='submit'>Sign Up</button>
            </form>
        );
    }
}
