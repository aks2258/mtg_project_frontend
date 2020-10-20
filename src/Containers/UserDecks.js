import React, { Component } from 'react'
// import { Button, Form } from 'semantic-ui-react'
import { Grid, Header } from 'semantic-ui-react'
import Card from '../Components/Card'
import DeleteDeck from '../Components/DeleteDeck'
import Cascading from "../images/Cascading.png"
import { Parallax } from "react-parallax";

class UserDecks extends Component {
    state = {
        open: false
    }

    handleRenderDecks = () => {
        
    }
    render() {
        const image2 = Cascading
        const insideStyles = {
            background: "white",
            padding: 20,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
          };

        return (
            <Parallax bgImage={image2} strength={-100}>
                <div style={{ height: 500 }}>
                    <div style={insideStyles}>
                    <Header size='huge'>Your Decks</Header>
                    <Grid celled centered stackable>
                {this.props.userDecks.map(
                    deck => 
                    <Grid.Row key = {deck.id} >
                        <Grid.Column width={3}>
                            {deck.name}
                        </Grid.Column>
                        <Grid.Column width={5}>
                        Type: {deck.deck_type}
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Card deckId = {deck.id} deckName = {deck.name}/>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <DeleteDeck deleteDeck = {this.props.deleteDeck} deckId={deck.id}/>
                        </Grid.Column>
                    </Grid.Row>
                    )}
                </Grid>
                    </div>
                </div>
            </Parallax>
        )
    }
}

export default UserDecks