import React, { Component } from 'react';
// import {Redirect} from "react-router-dom";
import { Button, Form } from 'semantic-ui-react'

class CreateDeck extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
            deck_type: ""
        }
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value })
    }
    handleTypeChange = (e) => {
        this.setState({ deck_type: e.target.value })
    }

    createDeck = () =>{
        return <div className = "deck-form">
        <h3>Create Deck:</h3>
        <Form onSubmit={(e) => this.props.handleNewDeckSubmit(this.state.name, this.state.deck_type)}>
            <Form.Field>
            <input placeholder='Name' onChange={(e) => this.handleNameChange(e)}/>
            <br></br>
            <input placeholder='Type' onChange={(e) => this.handleTypeChange(e)}/>
            </Form.Field>
            <Button basic type='submit'>Create Deck</Button>
        </Form>
        <br></br>
        </div>
      }

    render() {
        return (
            <div className = "create-div">
                {this.createDeck()}
            </div>
        );
    }
}

export default CreateDeck;