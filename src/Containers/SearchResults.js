import React, { Component } from 'react'

import MtgCard from '../Components/MtgCard'
import { Grid } from 'semantic-ui-react'

class SearchResults extends Component {
  render() {
    return (
      <div className="search-results" id='search-results'>
        {/* {console.log(this.props.cardSearchResults)} */}

        <Grid container centered stackable relaxed='very' columns={4} >
          {this.props.cardSearchResults.map(card => 

          <Grid.Column> 
            <MtgCard key = {card.id} card = {card} usersDecks={this.props.usersDecks}/>
          </Grid.Column>)}
        </Grid>
            {/* {this.props.cardSearchResults.map(card => 
            <MtgCard key = {card.id} card = {card} usersDecks={this.props.usersDecks}/>)} */}
      </div>
    )
  }
}

export default SearchResults