import React, { Component } from 'react'
import NavBar from '../components/navbar'
import ViewOrderReceipeModal from '../components/vieworderreceipesmodal'
import axios from 'axios';

export default class TableLedger extends Component{

    constructor(props){
        super(props)
		this.state = {
            tableledgerdetails:[],
		}
    }

    componentDidMount(){
        this.getTableLedgerDetails()
    }

    getTableLedgerDetails(){
        axios.get("http://localhost:4000/receipe/getallbillledgers")
        .then((response)=>{
        this.setState({ tableledgerdetails:response.data.message})
        })
        .catch((error)=>{console.log(error)})
    }


    renderTableLedgerDetails(){
        return this.state.tableledgerdetails.map(currenttableledger => {
            return(
                <tr key={currenttableledger._id}>
                                <th >{currenttableledger.tableNumber}</th>
                                <td >{currenttableledger.class}</td>
                                <td >{currenttableledger.date}</td>
                                <td >{currenttableledger.userName}</td>
                                <td >{currenttableledger.starttime}</td>
                                <td><div>{(currenttableledger.endtime).toString() ==='' ? '-' : <div>{currenttableledger.endtime}</div>}</div></td>
                                <td style={{ cursor:"pointer" }}><div>{parseInt(currenttableledger.orderItems.length) === 0 ? '-' : <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-shopping-basket" data-toggle="modal" data-target="#orderReceipeModal"></i><ViewOrderReceipeModal receipes={currenttableledger.orderItems}></ViewOrderReceipeModal> </div>}</div></td>
                                <td >{"$    "+currenttableledger.billAmount}</td>
                                <td><div>{(currenttableledger.status).toString() ==='Pending' ? <div className="alert alert-danger" role="alert"> Payment pending </div> : <div className="alert alert-success" role="alert"> Payment Done </div>}</div></td>
                </tr>   
            )
          })
    }

    render(){
        return(
            <div>
                <NavBar/>
                <div className="container" style={{padding : "50px"}}>
                    <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Table Number</th>
                                <th scope="col">Table Class</th>
                                <th scope="col">Table Date</th>
                                <th scope="col">Guest Name</th>
                                <th scope="col">Start Time</th>
                                <th scope="col">End Time</th>
                                <th scope="col">Ordered Receipes</th>
                                <th scope="col">Bill Amount</th>
                                <th scope="col">Bill Status</th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.renderTableLedgerDetails()}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}