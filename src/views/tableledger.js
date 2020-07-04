import React, { Component } from 'react'
import NavBar from '../components/navbar'
import ViewOrderReceipeModal from '../components/vieworderreceipesmodal'
import axios from 'axios';
import '../styles/views.css'

export default class TableLedger extends Component{

    constructor(props){
        super(props)
		this.state = {
            tableledgerdetails:[],
            tableorderitems:[]
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

    getTableLedgerDetailsById(id){
        axios.get("http://localhost:4000/receipe/getbillledgerbyid/"+id+"")
        .then((response)=>{
        this.setState({ tableorderitems:response.data.message.orderItems})
        })
        .catch((error)=>{console.log(error)})
    }


    renderTableLedgerDetails(){
        return this.state.tableledgerdetails.map(currenttableledger => {
            return(
                <tr key={currenttableledger._id}>
                                <th className="display">{currenttableledger.tableNumber}</th>
                                <td className="display">{currenttableledger.class}</td>
                                <td className="display">{currenttableledger.date}</td>
                                <td className="display">{currenttableledger.userName}</td>
                                <td className="display">{currenttableledger.starttime}</td>
                                <td className="display"><div>{(currenttableledger.endtime).toString() ==='' ? '-' : <div>{currenttableledger.endtime}</div>}</div></td>
                                <td className="display" style={{ cursor:"pointer" }}><div>{parseInt(currenttableledger.orderItems.length) === 0 ? '-' : <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-shopping-basket" data-toggle="modal" data-target="#orderReceipeModal" onClick={()=>{ this.getTableLedgerDetailsById(currenttableledger._id) }}></i> </div>}</div></td>
                                <td className="display">{"$    "+currenttableledger.billAmount}</td>
                                <td className="display"><div>{(currenttableledger.status).toString() ==='Pending' ? <div className="alert alert-danger" role="alert"> Payment pending </div> : <div className="alert alert-success" role="alert"> Payment Done </div>}</div></td>
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
                    <h3 style={{fontFamily: "Oswald",color:"#293d3d"}}>Table Ledger Details : </h3>
                </div>
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
                                <ViewOrderReceipeModal receipes={this.state.tableorderitems}></ViewOrderReceipeModal>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}