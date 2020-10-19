import React, { Component } from 'react'
// import { Button, Form } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react'
import Card from '../Components/Card'
import DeleteDeck from '../Components/DeleteDeck'

class UserDecks extends Component {
    state = {
        open: false
    }
    render() {
        return (
            <div className = "users-decks">
                <Grid celled>
                {this.props.userDecks.map(
                    deck => 
                    <Grid.Row key = {deck.id} >
                        <Grid.Column width={3}>
                            {deck.name}
                        </Grid.Column>
                        <Grid.Column width={5}>
                        Type: {deck.deck_type}
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Card deckId = {deck.id} deckName = {deck.name}/>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <DeleteDeck deleteDeck = {this.props.deleteDeck} deckId={deck.id}/>
                        </Grid.Column>
                    </Grid.Row>
                    )}
                </Grid>
            </div>
        )
    }
}

export default UserDecks