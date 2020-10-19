import React, { Component } from 'react';
// import {Redirect} from "react-router-dom";
import { Button, Modal } from 'semantic-ui-react'

class login extends Component {

    renderForm = () => {
        if(!this.props.loggedIn){
            return  <div className = "login-form-div">
            <form onSubmit={this.props.login}>
                <input type="text" name="username" placeholder="Username" onChange={this.props.handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={this.props.handleChange} />
                <button type="submit">Log In</button>
            </form>
        </div>
        }
    }

    render() {
        return (
            <div className = "login-div">
                <Modal
                  trigger={<Button>Login</Button>}
                  header='Please enter Username and Password!'
                  content= {this.renderForm()}
                />
            </div>
        );
    }
}

export default login;