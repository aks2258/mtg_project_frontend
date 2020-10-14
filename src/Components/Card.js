import React, { Component } from 'react'

import { Item } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'


class Card extends Component {
  state = {
    decks: []
  }
  renderUserDeck = () => {this.setState({decks: this.props.usersDecks.map(deck => {
      const key = deck.id
      const text = deck.name
      const value = deck.type
      const userDeck = {
        key: key,
        text: text,
        value: value
      }
      return userDeck
    }
  )})
  }

  handleClick = () => {
    console.log(this.state.decks)
  }

  render() {
    return (
      <div className="card-div" id='card-div'>
          {/* {console.log(this.props.card.name)} */}
            <Item.Group unstackable relaxed>
                <Item>
                    <Item.Image src={this.props.card.imageUrl} alt={this.props.card.name} />
                        {/* <Item.Content> */}
                        <Item.Header>{this.props.card.name}</Item.Header>
                            <Item.Meta>
                                <span>{this.props.card.type}</span>
                            </Item.Meta>
                            <br/>
                            <Dropdown
                              placeholder='Select Deck'
                              fluid
                              selection
                              options={this.state.decks}
                            />
                            <br/>
                        <button onClick={this.handleClick}>Add to Deck</button>
                        {/* </Item.Content> */}
                </Item>
            </Item.Group>
      </div>
    )
  }
}

export default Card
        //   <Responsive as={Item.Group}>
        //             <Item.Group unstackable relaxed>

        //                 <Item>

        //                     <Item.Image src={album.images[1]["url"]} alt={album.name} />
        //                     <Responsive as={Item.Content}>
        //                         {/* <Item.Content> */}
        //                             <Item.Header>{album.name}</Item.Header>
        //                             <Item.Meta>
        //                                 <span>{album.artists[0].name}</span>
        //                             </Item.Meta>
        //                             <button onClick={this.handleClick}>Add to Shelf</button>

        //                         {/* </Item.Content> */}
        //                     </Responsive>
        //                 </Item>
        //             </Item.Group>
        //         </Responsive>