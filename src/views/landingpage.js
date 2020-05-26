import React, { Component } from 'react'
import NavBar from '../components/navbar'


export default class LandingPage extends Component{
    render(){
        return(
            <div>
                <NavBar/>
                <h1>In Landing Page Component</h1>
            </div>
        )
    }
}