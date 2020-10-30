import React, { Component } from 'react';
// import {Redirect} from "react-router-dom";
import { Button, Modal, Form } from 'semantic-ui-react'

class login extends Component {

    renderForm = () => {
        return  <Form onSubmit={this.props.editInfo}>
            <Form.Field>
              <label>Username</label>
              <input placeholder='Username' type="text" name="username" onChange={this.props.handleChange}/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input placeholder='Password' type="password" name="password" onChange={this.props.handleChange}/>
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input placeholder='Email' type="email" name= "email" onChange={this.props.handleChange}/>
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
    }

    render() {
        return (
            <div className = "account-info-div">
                <Modal
                  trigger={<Button>Edit Info</Button>}
                  header='Please enter new Username and Password!'
                  content= {this.renderForm()}
                />
            </div>
        );
    }
}

export default login;