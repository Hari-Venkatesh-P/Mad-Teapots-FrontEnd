import React, { Component } from 'react'
import NavBar from '../components/navbar'
import ViewOrderReceipeModal from '../components/vieworderreceipesmodal'
import axios from 'axios';

export default class TableLedger extends Component{

    constructor(props){
        super(props)
		this.state = {
            tableledgerdetails:[],
            tableorderitems:[]
		}
    }

    componentDidMount(){
        if((sessionStorage.getItem('admin') === null)) {
            if((sessionStorage.getItem('cook') === null)){
                if(sessionStorage.getItem('cook')!==null)
                {
                    sessionStorage.removeItem('cook');
                }
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
          }
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
                                <th >{currenttableledger.tableNumber}</th>
                                <td >{currenttableledger.class}</td>
                                <td >{currenttableledger.date}</td>
                                <td >{currenttableledger.userName}</td>
                                <td >{currenttableledger.starttime}</td>
                                <td><div>{(currenttableledger.endtime).toString() ==='' ? '-' : <div>{currenttableledger.endtime}</div>}</div></td>
                                <td style={{ cursor:"pointer" }}><div>{parseInt(currenttableledger.orderItems.length) === 0 ? '-' : <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-shopping-basket" data-toggle="modal" data-target="#orderReceipeModal" onClick={()=>{ this.getTableLedgerDetailsById(currenttableledger._id) }}></i> </div>}</div></td>
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
                                <ViewOrderReceipeModal receipes={this.state.tableorderitems}></ViewOrderReceipeModal>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}