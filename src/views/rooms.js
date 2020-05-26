import React, { Component } from 'react'
import NavBar from '../components/navbar'
import RoomCard from "../components/roomcard";
import ViewGuestModal from "../components/viewguestmodal";
import axios from 'axios';

export default class Rooms extends Component{

    constructor(props) {
		super(props)
		this.state = {
            singlerooms:[],
            twinorooms:[],
            triorooms:[],
            quadrooms:[],
            guestdetails : [] 
		}
    }
    
    componentDidMount(){
    axios.get("http://localhost:4000/room/getallroomsontype/Single")
    .then((response)=>{
        //console.log(response.data.message)
      this.setState({ singlerooms:response.data.message})
    })
    .catch((error)=>{console.log(error)})

    axios.get("http://localhost:4000/room/getallroomsontype/Twin")
    .then((response)=>{
        //console.log(response.data.message)
      this.setState({ twinorooms:response.data.message})
    })
    .catch((error)=>{console.log(error)})

    axios.get("http://localhost:4000/room/getallroomsontype/Trio")
    .then((response)=>{
        //console.log(response.data.message)
      this.setState({ triorooms:response.data.message})
    })
    .catch((error)=>{console.log(error)})

    axios.get("http://localhost:4000/room/getallroomsontype/Quad")
    .then((response)=>{
        //console.log(response.data.message)
      this.setState({ quadrooms:response.data.message})
    })
    .catch((error)=>{console.log(error)})

    }

    viewGuestDetails(id,date,name){
        console.log(id,date,name)
        axios.get("http://localhost:4000/room/getguestdetails/"+id+"/"+date+"/"+name+"")
        .then((response)=>{
        console.log(response.data.message)
        this.setState({ guestdetails:response.data.message})
    })
    .catch((error)=>{console.log(error)})
    }
    
    renderSingleRooms() {
          return this.state.singlerooms.map(currentsingleroom => {
            return <RoomCard room={currentsingleroom} viewDetails={this.viewGuestDetails} key={currentsingleroom._id}/>;
          })
      }

    renderTwinoRooms() {
        return this.state.twinorooms.map(currenttwinoroom => {
          return <RoomCard room={currenttwinoroom} viewDetails={this.viewGuestDetails} key={currenttwinoroom._id}/>;
        })
    }

    renderTrioRooms() {
        return this.state.triorooms.map(currenttrioroom => {
          return <RoomCard room={currenttrioroom} viewDetails={this.viewGuestDetails} key={currenttrioroom._id} />;
        })
    }

    renderQuadRooms(){
        return this.state.quadrooms.map(currentquadroom => {
            return <RoomCard room={currentquadroom} viewDetails={this.viewGuestDetails} key={currentquadroom._id}/>;
        })
    }

    displayViewGuestModal(){
            return <ViewGuestModal guestdetails={this.guestdetails} />;
    }

    render(){
        return(
            <div>
                <NavBar/>
                <div className="card" style={{padding:"10px"}}>
                    <div className="card-header bg-dark text-light">
                        SINGLE ROOMS
                    </div>
                    <div className="card-body">
                        { this.renderSingleRooms() }
                    </div>
                </div>
                <div className="card" style={{padding:"10px"}}>
                    <div className="card-header bg-dark text-light">
                        TWINO ROOMS
                    </div>
                    <div className="card-body">
                        { this.renderTwinoRooms() }
                    </div>
                </div>
                <div className="card" style={{padding:"10px"}}>
                    <div className="card-header bg-dark text-light">
                        TRIO ROOMS
                    </div>
                    <div className="card-body">
                        { this.renderTrioRooms() }
                    </div>
                </div>
                <div className="card" style={{padding:"10px"}}>
                    <div className="card-header bg-dark text-light">
                        QUAD ROOMS
                    </div>
                    <div className="card-body">
                        { this.renderQuadRooms() }
                    </div>
                </div>
                {}
            </div>
        )
    }
}