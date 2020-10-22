import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

class SearchForm extends Component {
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
    handlesearchColorsChange = (e) => {
        this.setState({ searchColors: e.target.value })
    }
    handlesearchManaCostChange = (e) => {
        this.setState({ searchManaCost: e.target.value })
    }
    handleSearchNameChange = (e) => {
        this.setState({ searchName: e.target.value })
    }

    render() {
        return (
            <div className = "search-form">
                <h3>Search Cards</h3>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Field>
                    <input placeholder='Type (eg: land, instance, sorcery, creature...)' onChange={(e) => this.handleTypeChange(e)}/>
                    <input placeholder='Colors' onChange={(e) => this.handlesearchColorsChange(e)}/>
                    <input placeholder='Mana Cost' onChange={(e) => this.handlesearchManaCostChange(e)}/>
                    <input placeholder='Name (eg: Niv-mizzet, forest, island...)' onChange={(e) => this.handleSearchNameChange(e)}/>
                    </Form.Field>
                    <Button type='submit'>Search</Button>
                </Form>
                <br></br>
            </div>
        )
    }
}

export default SearchForm