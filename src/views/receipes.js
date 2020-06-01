import React, { Component } from 'react'
import NavBar from '../components/navbar'

import AddReceipeModal from '../components/addreceipemodal'

import axios from 'axios';

export default class Receipe extends Component{

    constructor(props){
        super(props)
		this.state = {
            receipeName : '',
            receipeOfferQuantity : '',
            receipePrice : '',
            receipedetails : [],
        }
        this.onchangeReceipePrice = this.onchangeReceipePrice.bind(this);
        this.onchangeReceipeQuanity = this.onchangeReceipeQuanity.bind(this);
        this.onchangeReceipeName = this.onchangeReceipeName.bind(this);
        this.addReceipe = this.addReceipe.bind(this);
    }

    componentDidMount(){
        if(sessionStorage.getItem('cook') === null) {
            if(sessionStorage.getItem('admin')!==null)
            {
                sessionStorage.removeItem('admin');
            }
            if(sessionStorage.getItem('guest')!==null)
            {
                sessionStorage.removeItem('guest');
            }
            if(sessionStorage.getItem('table_id')!==null)
            {
                sessionStorage.removeItem('table_id');
            }
            window.location = "/"
          }
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
            console.log(reqbody)
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

        deleteReceipe(id){
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
                    this.getAllReceipes()
                }else{
                    console.log(response.data.message)
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
        console.log(this.state.receipedetails)
            return this.state.receipedetails.map(currentreceipe => {
                return(
                    <tr key={currentreceipe._id}>
                                    <th >{currentreceipe.receipeName}</th>
                                    <td>{currentreceipe.receipeOfferQuantity}</td>
                                    <td>{"$ "+currentreceipe.receipePrice}</td>
                                    <td>{(currentreceipe.receipeAvailablity).toString() ==='true' ? 'Available' : 'Not Available'}</td>
                                    <td>{(currentreceipe.receipeAvailablity).toString() ==='true' ? <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>{ this.toggleReceipe(currentreceipe._id) }}>Make UnAvailable</button> : <button type="button" className="btn btn-outline-success btn-sm" onClick={()=>{ this.toggleReceipe(currentreceipe._id) }}>Make Available</button>}</td>
                                    <td style={{ cursor:"pointer" }}><i className="fa fa-trash" onClick={()=>{ this.deleteReceipe(currentreceipe._id) }}></i></td>
                    </tr>   
                )
              })
        }
    render(){
        return(
            <div>
                <NavBar/>
                <div className="container">
                    <div style={{marginTop : "20px",marginBottom : "20px",display: "flex",justifyContent: "flex-end"}}>
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
                    </div>
                </div>
            </div>
        )
    }
}