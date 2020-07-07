import React, { Component } from 'react';
import axios from 'axios';


class LinkSaver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const link = this.state.link;
        const access = localStorage.getItem("refresh_token")
        axios.post('http://127.0.0.1:8000/api/urls/', {
            link,
            access
        }).then(res => {
            console.log(res)
            console.log(res.data)
        })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="link" value={this.state.link} onChange={this.handleChange} placeholder="add link"></input>
                    <button type="submit">add</button>
                </form>
            </div>
        );
    }
}

export default LinkSaver;