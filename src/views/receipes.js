import React, { Component } from 'react'
import NavBar from '../components/navbar'

import DeleteReceipeModal from "../components/deletereceipemodal"
import AddReceipeModal from '../components/addreceipemodal'
import '../styles/views.css'

import axios from 'axios';

export default class Receipe extends Component{

    constructor(props){
        super(props)
		this.state = {
            receipeName : '',
            receipeOfferQuantity : '',
            receipePrice : '',
            receipedetails : [{
                receipeAvailablity: true,
                receipePrice: 0,
                _id: "",
                receipeName: "",
                receipeOfferQuantity: "",
            }],
            receipe : {
                receipeAvailablity: true,
                receipePrice: 0,
                _id: "",
                receipeName: "",
                receipeOfferQuantity: "",
            }
        }
        this.onchangeReceipePrice = this.onchangeReceipePrice.bind(this);
        this.onchangeReceipeQuanity = this.onchangeReceipeQuanity.bind(this);
        this.onchangeReceipeName = this.onchangeReceipeName.bind(this);
        this.addReceipe = this.addReceipe.bind(this);
        this.deleteReceipe = this.deleteReceipe.bind(this);
    }

    componentDidMount(){
        this.getAllReceipes()
        }

    onchangeReceipePrice(e){
        this.setState({
            receipePrice : e.target.value
          }); 
    }

    onchangeReceipeQuanity(e){
        this.setState({
            receipeOfferQuantity : e.target.value
          }); 
    }

    onchangeReceipeName(e){
        this.setState({
            receipeName : e.target.value
          }); 
    }

    addReceipe(){
        if(this.state.receipeName ==='' || this.state.receipeOfferQuantity ==='' || this.state.receipePrice ===''){
            alert("Fill all the fields..!!")
        }else{
            const reqbody = {
                receipeName : this.state.receipeName,
                receipeOfferQuantity : this.state.receipeOfferQuantity,
                receipePrice : this.state.receipePrice,
            }
            axios.post("http://localhost:4000/receipe/addreceipe",reqbody)
            .then((response)=>{
                if(response.data.success){
                    alert(response.data.message)
                        this.getAllReceipes()
                }else{
                    console.log(response.data.message)
                }
            })
            .catch((error)=>{console.log(error)})
        }
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

        deleteReceipe(id,name,enteredname){
            if(name === enteredname){
                if(id==null){
                    console.log("Req body id is null")
                }else{
                    const reqbody = {
                        _id : id,
                    }
                    axios.post("http://localhost:4000/receipe/deletereceipebyid",reqbody)
                    .then((response)=>{
                    if(response.data.success){
                        alert(response.data.message)
                        
                        this.setState({
                            receipedetails : this.state.receipedetails.filter(receipe => receipe._id !== id)
                          }) 
                    }else{
                        console.log(response.data.message)
                    }
                    })
                    .catch((error)=>{console.log(error)})
                }
            }
        }

        getReceipeById(id){
                if(id==null){
                    console.log("Receipe Id is null")
                }else{
                    axios.get("http://localhost:4000/receipe/getreceipebyid/"+id+"")
                    .then((response)=>{
                    if(response.data.success){
                        this.setState({
                            receipe : response.data.message
                          })
                    }else{
                        this.setState({
                            receipe : {
                                receipeAvailablity: true,
                                receipePrice: 0,
                                _id: "",
                                receipeName: "",
                                receipeOfferQuantity: "",
                            }
                          }) 
                    }
                    })
                    .catch((error)=>{console.log(error)})
                }
        }

        toggleReceipe(id){
            if(id==null){
                console.log("Req body id is null")
            }else{
                const reqbody = {
                    _id : id,
                }
                axios.post("http://localhost:4000/receipe/receipeavailablitytoggle",reqbody)
                .then((response)=>{
                if(response.data.success){
                    alert(response.data.message)
                    this.getAllReceipes()
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
                                    <th className="display">{currentreceipe.receipeName}</th>
                                    <td className="display"> {currentreceipe.receipeOfferQuantity}</td>
                                    <td className="display">{"$ "+currentreceipe.receipePrice}</td>
                                    <td className="display">{(currentreceipe.receipeAvailablity).toString() ==='true' ? 'Available' : 'Not Available'}</td>
                                    <td className="display">{(currentreceipe.receipeAvailablity).toString() ==='true' ? <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>{ this.toggleReceipe(currentreceipe._id) }}>Make UnAvailable</button> : <button type="button" className="btn btn-outline-success btn-sm" onClick={()=>{ this.toggleReceipe(currentreceipe._id) }}>Make Available</button>}</td>
                                    <td className="display" style={{ cursor:"pointer" }}><i className="fa fa-trash" data-toggle="modal" data-target="#deleteReceipeModal" onClick={ () => {this.getReceipeById(currentreceipe._id)}} ></i></td>
                    </tr>   
                )
              })
        }
    render(){
        return(
            <div>
                <NavBar/>
                <div className="container">
                <div style={{display:"flex",justifyContent:"flexStart",marginTop :"1%"}}>
                    <h3 style={{fontFamily: "Oswald",color:"#293d3d"}}>Receipe Details : </h3>
                </div>
                    <div style={{marginBottom : "20px",display: "flex",justifyContent: "flex-end"}}>
                        <button type="button" className="btn btn-outline-dark" style={{marginLeft : "10px",marginRight : "10px"}} data-toggle="modal" data-target="#addReceipeModal"><i className="fa fa-plus"></i>&nbsp;&nbsp;Add Receipe</button>
                        <AddReceipeModal addReceipe={this.addReceipe} onchangeReceipeName={this.onchangeReceipeName} onchangeReceipeQuanity={this.onchangeReceipeQuanity} onchangeReceipePrice={this.onchangeReceipePrice}></AddReceipeModal>
                    </div>
                    <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Receipe Name</th>
                                <th scope="col">Receipe Quantity</th>
                                <th scope="col">Receipe Price</th>
                                <th scope="col">Receipe Availablity</th>
                                <th scope="col">Availablity Toggle</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                               {this.renderReceipeDetails()}
                        </tbody>
                    </table>
                        <DeleteReceipeModal receipeName={this.state.receipe.receipeName} receipeId={this.state.receipe._id} deleteReceipe={this.deleteReceipe}></DeleteReceipeModal>
                    </div>
                </div>
            </div>
        )
    }
}