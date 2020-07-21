import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

handleChange(e) {
    this.setState({user: e.target.value})
}

    render() {
        return (
            <div>
                <form onSubmit={this.props.postUserInfo}>
                    <input value={this.props.user.username} name="username" onChange={this.handleChange} placeholder="enter username" type="text"></input>
                    <input value={this.props.user.password} name="password" onChange={this.handleChange} placeholder="enter password" type="password"></input>
                    <button type="submit">Log In</button>
                </form>
            </div>
        );
    }
}

export default Login;