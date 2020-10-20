import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

import { Button, Form, Modal } from 'semantic-ui-react'

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            email: "",
            created: false
        }
    }


    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    };


    createUser = (event) => {
        event.preventDefault()
        event.target.reset()
        const { username, email, password } = this.state

        let user = {
            username: username,
            email: email,
            password: password
        }

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ user })
        })
            .then(r => r.json())
            .then(response => {
                // We are reciving a status of "created" if the user is valid and saved to the database
                if (response.status === "created") {
                    this.setState({ created: true })
                } else {
                    console.log(response)
                    this.renderSignUp()
                }
            })

    }

    renderSignUp = () => {
        return this.state.created ? <Redirect to="/" /> : <div className = "signup-modal">
            <Modal
                  trigger={<Button>Sign Up</Button>}
                  header='Please enter Username and Password!'
                  content= {this.renderSignupForm()}
                />
        </div>

    }

    renderSignupForm = () => {
        return <Form onSubmit={this.createUser}>
                  <Form.Field>
                    <label>Username</label>
                    <input placeholder='Username' type="text" name="username" onChange={this.handleChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' type="password" name="password" onChange={this.handleChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' type="email" name="email" onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>
    }

    render() {
        return (
            <div className = "sign-up-div">
                {this.renderSignUp()}
            </div>
        );
    }
}

export default SignUp;