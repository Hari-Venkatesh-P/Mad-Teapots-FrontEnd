import React, { Component } from 'react'
import NavBar from '../components/navbar'
import ViewOrderReceipeModal from '../components/vieworderreceipesmodal'

import axios from 'axios';
import '../styles/views.css'

export default class Tables extends Component{

    constructor(props){
        super(props)
		this.state = {
            tabledetails:[],
            tableOrderItems:[],
		}
    }

    componentDidMount(){
        this.getTableDetails()
    }

    getTableDetails(){
        axios.get("http://localhost:4000/receipe/getalltables")
        .then((response)=>{
        this.setState({ tabledetails:response.data.message})
        })
        .catch((error)=>{console.log(error)})
    }

    getTableReceipeDetails(id){
        axios.get("http://localhost:4000/receipe/gettablebyid/"+id+"")
        .then((response)=>{
        this.setState({ tableOrderItems:response.data.message.orderItems})
        console.log(this.state.tableOrderItems);
        })
        .catch((error)=>{console.log(error)})
    }

    payBill(id){
        console.log(id)
        if(id === ''){
            alert("Issue with bill payment")
        }else{
            const reqbody = {
                _id : id
            }
        axios.post("http://localhost:4000/receipe/paybill",reqbody)
        .then((response)=>{
         if(response.data.success){
            alert(response.data.message)
            this.getTableDetails()
         }else{
             alert("Problems in settling the bill..!!")
             console.log(response.data.message)
         }
        })
        .catch((error)=>{
            console.log(error)
        })
        }
    }

    renderTableDetails(){
        return this.state.tabledetails.map(currenttable => {
            return(
                <tr key={currenttable._id}>
                                <th className="display" >{currenttable.tableNumber}</th>
                                <td className="display"><div>{(currenttable.class).toString() ==='Non Air Conditioned' ? <div className="alert alert-secondary" role="alert"> Non Air Conditioned </div> : <div className="alert alert-primary" role="alert">Air Conditioned </div>}</div></td>
                                <td className="display"><div>{(currenttable.userName).toString() ==='' ? <div className="alert alert-success" role="alert"> Table available </div> : <div className="alert alert-danger" role="alert"> Table not available </div>}</div></td>
                                <td className="display">{(currenttable.userName).toString() ==='' ? <p> - </p> : <p> {currenttable.userName} </p>}</td>
                                <td  className="display"  style={{ cursor:"pointer" }}><div>{parseInt(currenttable.orderItems.length) === 0 ? '-' : <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-shopping-basket" data-toggle="modal" data-target="#orderReceipeModal" onClick={()=>{ this.getTableReceipeDetails(currenttable._id) }} ></i> </div>}</div></td>
                                <td className="display">{(currenttable.userName).toString() ==='' ? <p> - </p> : <p> {"$    "+currenttable.billAmount} </p>}</td>
                                <td className="display" style={{ cursor:"pointer" }}><i className="fa fa-tags" onClick={()=>{ this.payBill(currenttable._id) }}></i></td>
                </tr>   
            )
          })
    }

    render(){
        return(
            <div>
                <NavBar/>
                <div className="container" style={{padding : "1%"}}>
                <div style={{display:"flex",justifyContent:"flexStart"}}>
                    <h3 style={{fontFamily: "Oswald",color:"#293d3d"}}>Table Current Details : </h3>
                </div>
                    <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Table Number</th>
                                <th scope="col">Table Class</th>
                                <th scope="col">Table Availablity</th>
                                <th scope="col">Guest Name</th>
                                <th scope="col">Ordered Receipes</th>
                                <th scope="col">Bill Amount</th>
                                <th scope="col">Pay Bill</th>
                            </tr>
                        </thead>
                        <tbody>
                               {this.renderTableDetails()}
                               <ViewOrderReceipeModal receipes={this.state.tableOrderItems}></ViewOrderReceipeModal>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}