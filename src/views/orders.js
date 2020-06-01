import React, { Component } from 'react'
import NavBar from '../components/navbar'

import axios from 'axios';

import OrderedReceipeCards from '../components/orderedreceipecard'


export default class Orders extends Component{

    constructor(props){
        super(props)
		this.state = {
            tableDetails : [],
            orderDetails : [],
        }
        this.getMyTable = this.getMyTable.bind(this);
    }

    componentDidMount(){
        if((sessionStorage.getItem('guest') === null) || (sessionStorage.getItem('table_id') === null)) {
            if(sessionStorage.getItem('cook')!==null)
            {
                sessionStorage.removeItem('cook');
            }
            if(sessionStorage.getItem('admin')!==null)
            {
                sessionStorage.removeItem('admin');
            }
            window.location = "/"
          }
        this.getMyTable()
    }

    getMyTable(){
        var _id
        if(sessionStorage.getItem('table_id')!=null){
            _id = sessionStorage.getItem('table_id')
        }
        console.log(_id)
        if(_id === ''){
            alert("Unable to fetch current orderDetails")
        }else{
            axios.get("http://localhost:4000/receipe/gettablebyid/"+_id+"")
            .then((response)=>{
            if(response.data.success){
                this.setState({
                    tableDetails : response.data.message,
                    orderDetails : response.data.message.orderItems,
                })
            }else{
                console.log(response.data.message)
            }
            })
            .catch((error)=>{console.log(error)})
        }
    }


    renderOrderedReceipeCards() {
        var i=0;
        return this.state.orderDetails.map(currentReceipe => {
            i= i+1
          return <OrderedReceipeCards receipe={currentReceipe} index={i} key={currentReceipe._id}> </OrderedReceipeCards>
        })
    }

    getBasicDetailsFromBill(){
        return (
            <div>
                <div style={{display:"flex",justifyContent:"flex-start" ,marginTop:"10px",marginBottom:"10px"}}>
                    <div className="alert alert-secondary" role="alert" style={{marginTop:"10px",marginBottom:"10px",marginRight:"10px"}}> <b>Guest Name :</b> {this.state.tableDetails.userName} </div>
                    <div className="alert alert-secondary" role="alert" style={{marginTop:"10px",marginBottom:"10px",marginRight:"10px"}}> <b> Current Bill : </b> {"$  "+this.state.tableDetails.billAmount} </div>
                </div>
                <div style={{display:"flex",justifyContent:"flex-start" ,marginTop:"10px"}}>
                    <div className="alert alert-secondary" role="alert" style={{marginTop:"5px",marginRight:"10px"}}> <b> Table Number : </b>{this.state.tableDetails.tableNumber} </div>
                    <div className="alert alert-secondary" role="alert" style={{marginTop:"5px",marginRight:"10px"}}> <b>Table Class : </b>{this.state.tableDetails.class} </div>
                </div>
            </div>
            )
    }


    render(){
        return(
            <div>
                <NavBar/>
                <div className="container">
                   <div> {this.getBasicDetailsFromBill()} </div>
                   <br/>
                   <div>{ parseInt(this.state.orderDetails.length)=== 0 ? <h3 style={{fontFamily: "Oswald"}}>No Receipes Ordered..!!</h3> : <div> {this.renderOrderedReceipeCards()}</div>   } </div>
                </div>
            </div>
        )
    }
}