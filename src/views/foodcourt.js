import React, { Component } from 'react'
import NavBar from '../components/navbar'

import axios from 'axios';

export default class FoodCourt extends Component{

    constructor(props){
        super(props)
		this.state = {
            receipedetails : [],
        }
    }

    componentDidMount(){
        this.getAllReceipes()
    }

    getAllReceipes(){
        axios.get("http://localhost:4000/receipe/getallreceipe")
        .then((response)=>{
            if(response.data.success){
                this.setState({ receipedetails:response.data.message})
            }else{
                console.log(response.data.message)
            }
        })
        .catch((error)=>{console.log(error)})
    }

    renderReceipeDetails(){
        return this.state.receipedetails.map(currentreceipe => {
            return(
                <tr key={currentreceipe._id}>
                                <td >{currentreceipe.receipeName}</td>
                                <td>{currentreceipe.receipeOfferQuantity}</td>
                                <td>{"$ "+ currentreceipe.receipePrice}</td>
                                <td style={{ cursor:"pointer" }}><i class="fa fa-shopping-cart"></i></td>
                </tr>   
            )
          })
    }

    render(){
        return(
            <div>
                <NavBar/>
                <div className="container" style={{marginTop : "40px"}}>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Receipe Name</th>
                                    <th scope="col">Receipe Quantity</th>
                                    <th scope="col">Receipe Price</th>
                                    <th scope="col">Order Me</th>
                                </tr>
                            </thead>
                            <tbody>
                               {this.renderReceipeDetails()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}