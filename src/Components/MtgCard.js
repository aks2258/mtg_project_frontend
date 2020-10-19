import { subtype } from 'mtgsdk'
import React, { Component } from 'react'

// import { Item } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Card, Image } from 'semantic-ui-react'

class MtgCard extends Component {
  state = {
    // decks: [],
    chosenDeck: null,
    addedCard: {}
  }
  // componentDidMount = () =>{
  //   this.renderUserDeck()
  //   console.log("Testing")
  // }

  // renderUserDeck = () => {this.setState({decks: this.props.usersDecks.map(deck => {
  //     const key = deck.id
  //     const text = deck.name
  //     const value = deck.deck_type
  //     const userDeck = {
  //       text: text,
  //       value: key
  //     }
  //     console.log(userDeck)
  //   }
  // )})
  // }

  handleAddToDeck = () => {
    console.log(this.state.decks)
    console.log(this.state.chosenDeck)
    const colors = this.props.card.color.map(color=>{return color})
    const subTypes = this.props.card.subtypes.map(subtype=>{return subtype})

    const card = {
      name: this.props.card.name,
      manaCost: this.props.card.manaCost,
      colors: colors,
      type: this.props.card.type,
      types: this.props.card.types,
      subtypes: subTypes,
      card_effect: this.props.card.originalText,
      power: this.props.card.power,
      toughness: this.props.card.toughness,
      imgUrl: this.props.card.imageUrl,
      deck_id: this.state.chosenDeck
    }

    return fetch('http://localhost:3000/cards', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(card)
    })
    .then(res => res.json())
    .then(data => {
      console.log("working", data)
      this.setState({ addedCard: data })
    })
  }
  
  getChosenDeck = (e, {value}) => {
    // console.log(value)
    this.setState({chosenDeck: value})
  }

  render() {
    return (
      <div className="card-div" id='card-div'>
          <Card>
            <Image src={this.props.card.imageUrl} alt={this.props.card.name} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{this.props.card.name}</Card.Header>
              <Card.Meta>
                <span className='type'>{this.props.card.type}</span>
              </Card.Meta>
              <Card.Description>
                Mana Cost: {this.props.card.manaCost}
                <br/>
                <br/>
                Colors: {this.props.card.colors.map(color => {return <p>{color}</p>})}
                <br/>
                Type: {this.props.card.types}
                <br/>
                <br/>
                Subtypes: {this.props.card.subtypes.map(subtype => {return <p>{subtype}</p>})}
                <br/>
                Card Effect: {this.props.card.originalText}
                <br/>
                <br/>
                Power/Toughness: {this.props.card.power}/{this.props.card.toughness}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Dropdown
                  key = {this.props.card.name+"dropdown"}
                  placeholder='Select Deck'
                  fluid
                  selection
                  options={this.props.decks.map(deck => {
                    const key = deck.id
                    const text = deck.name
                    const value = deck.deck_type
                    const userDeck = {
                      text: text,
                      value: key
                    }
                    return userDeck
                  }
                )}
                  onChange={this.getChosenDeck}
                />
                <button onClick={this.handleAddToDeck}>Add to Deck</button>
              </a>
            </Card.Content>
        </Card>
      </div>
    )
  }
}

export default MtgCard