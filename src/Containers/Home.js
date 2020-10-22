import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";

import SearchForm from '../Components/SearchForm'
import Login from "./Login"
import SearchResults from "../Containers/SearchResults"
import Signup from "./Signup"
import CreateDeck from "../Components/CreateDeck"
import UserDecks from "./UserDecks"
// import logo from "../public/images/logo.png"
import UnlcaimedTerritory from "../images/Unclaimed-Territory.jpg"
import { Parallax } from "react-parallax";
import { Button, Header } from 'semantic-ui-react'
import { HashLink } from 'react-router-hash-link';

const mtg = require('mtgsdk')
class Home extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            loggedIn: false,
            currentUser: "",
            searchResults: [],
            addedDeck: {},
            userDecks: [],
            id: "",
            newUsername: "",
            newUseremail: "",
            newUserpassword: "",
            accountOpen: false
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        
        this.setState({
            [name]: value
        })
    };

    login = (event) => {
        event.preventDefault()
        event.target.reset()

        const {username, password} = this.state

        const user = {username, password}
        console.log(user)
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user})
        })
        .then(r => r.json())
        .then(response => {
            // console.log(response.status)
            // The token below will be used as a header for Authorization in your fetches
            // If you look in application controller we are requesting the header Authorization
            // Once it is recieved the token is decrypted and access to data is granted
            localStorage.setItem("token", response.jwt)
            console.log(response.user.id)
            this.setState({currentUser: response.user.username, loggedIn: true, id: response.user.id})
            console.log(this.state.currentUser, this.state.loggedIn, this.state.id)
            this.handleFetchUsersDecks()
        })
        .catch(err => console.log(err))
    }

    handleEditInfo = (e) => {
        const {username, password, email} = this.state
        console.log(username, password, email)
        const user = {username, password, email}
        fetch(`http://localhost:3000/users/${this.state.id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({user})
        })
        .then(r => r.json())
        .then(response => {
            this.setState({currentUser: response.username, loggedIn: true, password: response.password, email: response.email})
            console.log(this.state.currentUser, this.state.loggedIn, this.state.id)
        })
        .catch(err => alert(err))
    }


    greeting = () => {
        if(this.state.loggedIn){
            return <div className = "logged-in-div">
                        <br/>
                        <h3>Welcome {this.state.username}!</h3>
                        {/* <AccountInfo accountOpen = {this.state.accountOpen} handleChange = {this.handleChange} editInfo = {this.handleEditInfo}/>
                        <br/> */}
                        <form>
                            <Button>Log Out</Button>
                        </form>
                        {this.renderJumpTos()}
                        <CreateDeck handleNewDeckSubmit = {this.handleNewDeckSubmit}/>
                        <br/>
                   </div>
        } else {
            return <div className = "welcome-div">
                    <Login 
                    login = {this.login} 
                    handleChange = {this.handleChange} 
                    loggedIn = {this.loggedIn}/>
                    <br/>
                    <Signup />
                    <br/>
                    {this.renderJumpTos()}
                    </div>
        }
    }

    fetchCard = (searchType, searchColors, searchManaCost, searchName) => {
        // e.preventDefault()
        // console.log(type, colors, manaCost, name)
        mtg.card.where({type: searchType, colors: searchColors, manaCost: searchManaCost, name: searchName})
        .then(cards => {
            this.setState({searchResults: cards})
        //   console.log(this.state.searchResults)
        })
      }

    handleNewDeckSubmit = (e, deckName, deckType) => {
        const deck = {
            name: deckName,
            deck_type: deckType
        }
        console.log(deck)
        return fetch('http://localhost:3000/decks', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              "Accept": 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(deck)
          })
          .then(res => res.json())
            .then(data => {
              console.log("working", data)
              this.setState({ addedDeck: data, userDecks: [...this.state.userDecks, data] })
              e.target.reset()
            })
    }

    handleFetchUsersDecks = () => {
        return fetch(`http://localhost:3000/user_decks/`, {
            headers: {
              'Content-Type': 'application/json',
              "Accept": 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
          })
          .then(res => res.json())
            .then(data => {
              console.log("working", data)
              this.setState({ userDecks: data })
            })
    }

    deleteDeck = (deckId) => {
        fetch(`http://localhost:3000/decks/${deckId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              },
        }).then(this.setState((prev) => ({ userDecks: prev.userDecks.filter(deck => deck.id !== deckId) })))
    }

    renderUserDecks = () => {
        if(this.state.loggedIn){
            return <UserDecks userDecks = {this.state.userDecks} deleteDeck = {this.deleteDeck}/>
        }
    }
    
    renderJumpTos = () => {
        if (this.state.loggedIn) {
            return <div id = "jump-tos">
                <br/>
                <Button>
                    <HashLink to="#search-results">Jump to Search Results</HashLink>
                </Button>
                <br/>
                <br/>
                <Button>
                    <HashLink to="#users-decks">Jump to Your Decks</HashLink>
                </Button>
                </div>
        } else {
            return <Button>
                    <HashLink to="#search-results">Jump to Search Results</HashLink>
                </Button>
        }
    }

    render() {

        const styles = {
            fontFamily: "sans-serif",
            textAlign: "center"
          };
          const insideStyles = {
            // background: "white",
            padding: 20,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            opacity: "90%"
          };

        const image1 = UnlcaimedTerritory


        return (
            <div className = "main-div" id = "main-div">
                <div className = "nav-items">
                <Parallax bgImage={image1} strength={500}>
                  <div style={{ height: 800 }}>
                    <div style={insideStyles}>
                        <Header size="huge">𝐈𝐦𝐩𝐞𝐫𝐟𝐞𝐜𝐭 𝐆𝐚𝐭𝐡𝐞𝐫𝐢𝐧𝐠</Header>
                        {this.greeting()}
                        <SearchForm fetchCard = {this.fetchCard}/></div>
                  </div>
                </Parallax>
                </div>
                    <SearchResults loggedIn= {this.state.loggedIn} cardSearchResults = {this.state.searchResults} decks={this.state.userDecks}/>
                {this.renderUserDecks()}
            </div>
        );
    }
}

export default Home;