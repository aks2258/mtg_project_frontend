import React, { Component } from 'react'

import MtgCard from '../Components/MtgCard'
import { Grid } from 'semantic-ui-react'

class SearchResults extends Component {
  state = {
    decks: []
  }

  // componentDidMount = () =>{
  //   console.log("Testing")
  //   this.renderUserDeck()
  // }

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
  
  render() {
    return (
      <div className="search-results" id='search-results'>
        {/* {console.log(this.props.cardSearchResults)} */}

        <Grid container centered stackable relaxed='very' columns={4} >
          {this.props.cardSearchResults.map(card => 

          <Grid.Column key = {card.id + card.name + "gridcolumn"}> 
            <MtgCard key = {card.id + card.name} card = {card} decks={this.props.decks}/>
          </Grid.Column>)}
        </Grid>
            {/* {this.props.cardSearchResults.map(card => 
            <MtgCard key = {card.id} card = {card} usersDecks={this.props.usersDecks}/>)} */}
      </div>
    )
  }
}

export default SearchResults