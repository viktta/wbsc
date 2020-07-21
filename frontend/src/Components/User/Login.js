import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
}
handleSubmit(e) {
    e.preventDefault();
    const username = this.state.username
    axios.get('http://127.0.0.1:8000/api/user/' + username)
    .then(res => {
        console.log(res)
        console.log(res.body)
    })
}

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.username} name="username" onChange={this.handleChange} placeholder="enter username" type="text"></input>
                    {/*<input value={this.state.password} name="password" onChange={this.handleChange} placeholder="enter password" type="password"></input>*/}
                    <button type="submit">Log In</button>
                </form>
            </div>
        );
    }
}

export default Login;