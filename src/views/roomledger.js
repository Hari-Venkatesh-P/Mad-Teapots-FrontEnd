import React, { Component } from 'react'
import NavBar from '../components/navbar'

import axios from 'axios';
import '../styles/views.css'

export default class RoomLedger extends Component{

    constructor(props){
        super(props)
		this.state = {
            roomledgerdetails:[],
		}
    }

    componentDidMount(){
    axios.get("http://localhost:4000/room/getroomledgerdetails")
    .then((response)=>{
      this.setState({ roomledgerdetails:response.data.message})
    })
    .catch((error)=>{console.log(error)})
    }

    getRoomLedgerDetails(){
        return this.state.roomledgerdetails.map(currentroomledger => {
            return(
                <tr key={currentroomledger._id}>
                                <th className="display">{currentroomledger.roomId}</th>
                                <td  className="display"> {currentroomledger.firstName}</td>
                                <td  className="display">{currentroomledger.lastName}</td>
                                <td className="display">{currentroomledger.address}</td>
                                <td className="display">{currentroomledger.city}</td>
                                <td className="display">{currentroomledger.mobile}</td>
                                <td className="display">{currentroomledger.checkInDate}</td>
                                <td className="display">{currentroomledger.checkOutDate}</td>
                                <td className="display"><div>{(currentroomledger.status).toString() ==='Vacated' ? <div className="alert alert-danger" role="alert"> Room Vacated </div> : <div className="alert alert-success" role="alert"> Room Not Vacated </div>}</div></td>
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
                    <h3 style={{fontFamily: "Oswald",color:"#293d3d"}}>Room Ledger Details : </h3>
                </div>
                    <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Room ID</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">City</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Check In Date</th>
                                <th scope="col">Check Out Date</th>
                                <th scope="col">Room Status</th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.getRoomLedgerDetails()}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}