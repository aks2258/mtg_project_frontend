import React, { Component } from 'react'
// import { Button, Form } from 'semantic-ui-react'
import { Button, Modal } from 'semantic-ui-react'
import { Header, Image, Table } from 'semantic-ui-react'

class Card extends Component {
    state = {
        cards: [],
        open: false,
        cardUrl: ''
    }
    getCardsInDeck = (deckId) => {
        return fetch(`http://localhost:3000/decks/${deckId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log("working", data.cards)
            this.setState({ cards: data.cards })
        })
    }

    changeImage = (imgUrl) => {
      this.setState({cardUrl: imgUrl })
    }

    removeCard = (cardId) => {
      fetch(`http://localhost:3000/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
      }).then(this.setState((prev) => ({ cards: prev.cards.filter(card => card.id !== cardId) })))
    }
    
    render() {
        return (
          <Modal
          onClose={() => this.setState({open: false})}
          onOpen={() => this.setState({open: true})}
          open={this.state.open}
          trigger={<Button onClick = {() => this.getCardsInDeck(this.props.deckId)}>Show Cards</Button>}
          >
            <Modal.Header>{this.props.deckName}</Modal.Header>
            <Modal.Content image>
              <Image size='medium' src={this.state.cardUrl} wrapped />
              <Modal.Description>
                <Header>Card List</Header>
                    {/* {console.log(this.state.cards)} */}
             {/* <div className = "deck-card-list"> */}
                    <Table basic='very' celled collapsing>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Card Name</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body id="deck-card-list">
                    {this.state.cards.map(card => {
                      return <Table.Row key={card.id+"key"}>
                        <Table.Cell>
                          <Header as='h4' image>
                            <Header.Content>
                            <Image src={card.imgUrl} rounded size='mini' onClick = {()=>this.changeImage(card.imgUrl)} />
                                {card.name} 
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell><Button onClick = {()=>this.removeCard(card.id)} color='red'>Remove From Deck</Button></Table.Cell>
                      </Table.Row>     
                    })}
                    </Table.Body>
                    </Table>
             {/* </div> */}
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={() => this.setState({open: false})}>
                Close
              </Button>
            </Modal.Actions>
          </Modal>
        )
    }
}

export default Card