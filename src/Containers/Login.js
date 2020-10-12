import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

class login extends Component {

    renderForm = () => {
        if(!this.props.loggedIn){
            return  <div className = "form-div">
            <form onSubmit={this.props.login}>
                <input type="text" name="username" placeholder="Username" onChange={this.props.handleChange} />
                <input type="text" name="password" placeholder="Password" onChange={this.props.handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
        }
    }

    render() {
        return (
            <div className = "main-div">
                {this.renderForm()}
            </div>
        );
    }
}

export default login;