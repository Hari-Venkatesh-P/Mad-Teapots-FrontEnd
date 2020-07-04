import React, { Component } from 'react'
import NavBar from '../components/navbar'

import '../styles/views.css'

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
        axios.get("https://hari-mad-teapots-backend.herokuapp.com/receipe/getallavailablereceipes")
        .then((response)=>{
            if(response.data.success){
                this.setState({ receipedetails:response.data.message})
            }else{
                console.log(response.data.message)
            }
        })
        .catch((error)=>{console.log(error)})
    }

    addReceipeToMyBill(receipeName){
        var _id
        if(sessionStorage.getItem('table_id')!=null){
            _id = sessionStorage.getItem('table_id')
        }
        console.log(receipeName,_id)
        if(receipeName === '' || _id === ''){

        }else{
            const reqbody = {
                    receipeName : receipeName,
                    _id : _id
            }
            console.log(reqbody)
            axios.post("https://hari-mad-teapots-backend.herokuapp.com/receipe/addreceipetobill",reqbody)
            .then((response)=>{
            if(response.data.success){
                alert(response.data.message)
            }else{
                console.log(response.data.message)
            }
            })
            .catch((error)=>{console.log(error)})
        }
    }

    renderReceipeDetails(){
        return this.state.receipedetails.map(currentreceipe => {
            return(
                <tr key={currentreceipe._id}>
                                <td className="display">{currentreceipe.receipeName}</td>
                                <td className="display">{currentreceipe.receipeOfferQuantity}</td>
                                <td className="display">{"$ "+ currentreceipe.receipePrice}</td>
                                <td style={{ cursor:"pointer" }}><i className="fa fa-shopping-cart" onClick={()=>{ this.addReceipeToMyBill(currentreceipe.receipeName) }}></i></td>
                </tr>   
            )
          })
    }

    render(){
        return(
            <div>
                <NavBar/>
                <div className="container" style={{marginTop : "1%"}}>
                <div style={{display:"flex",justifyContent:"flexStart"}}>
                    <h3 style={{fontFamily: "Oswald",color:"#293d3d"}}>Currently Available in Food Court :</h3>
                </div>
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