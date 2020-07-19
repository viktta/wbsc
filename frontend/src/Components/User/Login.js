import React, { Component } from 'react';
import axiosInstance from '../axiosApi';
import { connect } from 'react-redux';
import { postUserInfo } from '../../Actions/actionCreator';

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

const mapStateToProps = (state) => ({
    user : this.state.user
});

const mapDispatchToProps = {
    postUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);