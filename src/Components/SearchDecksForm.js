import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

class SearchDecksForm extends Component {
    state = {
        searchType: '',
        searchColors: '',
        searchManaCost: '',
        searchName: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // console.log(e.target)
        this.props.fetchCard(this.state.searchType, 
                            this.state.searchColors,
                            this.state.searchManaCost,
                            this.state.searchName)
    }

    handleTypeChange = (e) => {
        this.setState({ searchType: e.target.value })
    }
    handleSearchNameChange = (e) => {
        this.setState({ searchName: e.target.value })
    }

    render() {
        return (
            <div className = "search-form">
                <h3>Search Decks:</h3>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Field>
                    <input placeholder='Type' onChange={(e) => this.handleTypeChange(e)}/>
                    <input placeholder='Name' onChange={(e) => this.handleSearchNameChange(e)}/>
                    <br></br>
                    </Form.Field>
                    <Button basic type='submit'>Submit</Button>
                </Form>
                <br></br>
            </div>
        )
    }
}

export default SearchDecksForm