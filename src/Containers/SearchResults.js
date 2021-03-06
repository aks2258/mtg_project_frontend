import React, { Component } from 'react'
import MtgCard from '../Components/MtgCard'
import { Grid, Header, Button } from 'semantic-ui-react'
import { HashLink } from 'react-router-hash-link';

class SearchResults extends Component {
  state = {
    decks: []
  }

  renderUserDeck = () => {this.setState({decks: this.props.usersDecks.map(deck => {
      const key = deck.id
      const text = deck.name
      const value = deck.deck_type
      const userDeck = {
        text: text,
        value: key
      }
      console.log(userDeck)
      return userDeck
    }
  )})
  }
  
  renderUsersDecks = () => {
    if(this.props.loggedIn){
      return <Button>
              <HashLink to="#users-decks">Jump to Your Decks</HashLink>
            </Button>
    }
  }
  
  render() {
    return (
      <div className="search-results" id='search-results' style={{height: 800}}>
        <Button>
            <HashLink to="#main-div">Jump to Top</HashLink>
        </Button>
        {this.renderUsersDecks()}
        <Header inverted color='teal' align = "center" size='huge'>Search Results</Header>
        <Grid container centered stackable relaxed='very' columns={4} >
          {this.props.cardSearchResults.map(card => 

          <Grid.Column key = {card.id + card.name + "gridcolumn"}> 
            <MtgCard key = {card.id + card.name} card = {card} decks={this.props.decks}/>
          </Grid.Column>)}
        </Grid>
      </div>
    )
  }
}

export default SearchResults
// {this.props.cardSearchResults.map(card => 
// <MtgCard key = {card.id} card = {card} usersDecks={this.props.usersDecks}/>)}