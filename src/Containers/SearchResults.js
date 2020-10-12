import React, { Component } from 'react'

import Card from '../Components/Card'
import { Grid, GridRow } from 'semantic-ui-react'

class SearchResults extends Component {
  render() {
    return (
      <div className="search-results" id='search-results'>
        {/* {console.log(this.props.cardSearchResults)} */}
            {this.props.cardSearchResults.map(card => 
            <Card key = {card.id} card = {card}/>)}

      </div>
    )
  }
}

export default SearchResults