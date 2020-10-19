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
import logo from "../images/logo.png"

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
            id: ""
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


    greeting = () => {
        if(this.state.loggedIn){
            return <div>
                        <h3>Welcome {this.state.username}</h3>
                        <CreateDeck handleNewDeckSubmit = {this.handleNewDeckSubmit}/>
                   </div>
        }else{
            return <div>
                    <h3>Welcome!</h3>
                    <Login 
                    login = {this.login} 
                    handleChange = {this.handleChange} 
                    loggedIn = {this.loggedIn}/>
                    <br/>
                    <Signup />
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

    handleNewDeckSubmit = (deckName, deckType) => {
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

    render() {
        return (
            <div>
                <div className = "website-name">
                <img classname = "logo" src={logo} alt='imperfect gathering logo' />
                </div>
                <div className = "nav-items">
                    <div className = "welcome-div">
                        {this.greeting()}
                    </div>
                    <SearchForm fetchCard = {this.fetchCard}/>
                </div>
                <SearchResults cardSearchResults = {this.state.searchResults} decks={this.state.userDecks}/>
                <br/>
                <br/>
                {this.renderUserDecks()}
            </div>
        );
    }
}

export default Home;