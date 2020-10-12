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

const mtg = require('mtgsdk')
class Home extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            loggedIn: false,
            currentUser: "",
            searchResults: []
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
        // console.log(user)
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
            // console.log(response)
            this.setState({currentUser: response.user.username, loggedIn: true})
            console.log(this.state.currentUser, this.state.loggedIn)
        })
        .catch(err => console.log(err))
    }


    greeting = () => {
        if(this.state.loggedIn){
            return <div>
                        <h3>Welcome {this.state.username}</h3>
                   </div>
        }else{
            return <div>
                    <h3>Welcome!</h3>
                    <h3>Please Log In</h3>
                    <Login 
                    login = {this.login} 
                    handleChange = {this.handleChange} 
                    loggedIn = {this.loggedIn}/>
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
    

    render() {
        return (
            <div><br/>
                {this.greeting()}
                <SearchForm fetchCard = {this.fetchCard}/>
                <SearchResults cardSearchResults = {this.state.searchResults}/>
            </div>
        );
    }
}

export default Home;