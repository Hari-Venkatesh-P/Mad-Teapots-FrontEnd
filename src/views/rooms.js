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
        this.getSingleRooms()
        this.getTwinRooms()
        this.getTrioRooms()
        this.getQuadRooms()
    }

    getSingleRooms(){
        axios.get("http://localhost:4000/room/getallroomsontype/Single")
        .then((response)=>{
        if(response.data.success){
            this.setState({ singlerooms:response.data.message})
        }else{
            console.log(response.data.message)
        }
        })
        .catch((error)=>{console.log(error)})
    }

    getTwinRooms(){
        axios.get("http://localhost:4000/room/getallroomsontype/Twin")
        .then((response)=>{
        if(response.data.success){
            this.setState({ twinorooms:response.data.message})
        }else{
            console.log(response.data.message)
        }
        })
        .catch((error)=>{console.log(error)})
    }

    getTrioRooms(){
        axios.get("http://localhost:4000/room/getallroomsontype/Trio")
        .then((response)=>{
        if(response.data.success){
            this.setState({ triorooms:response.data.message})
        }else{
            console.log(response.data.message)
        }
        })
        .catch((error)=>{console.log(error)})
    }

    getQuadRooms(){
        axios.get("http://localhost:4000/room/getallroomsontype/Quad")
        .then((response)=>{
        if(response.data.success){
            this.setState({ quadrooms:response.data.message})
        }else{
            console.log(response.data.message)
        }
        })
        .catch((error)=>{console.log(error)})
    }

    vacateRoom(roomid,date,name,type){
        if(date === '' || name ==='' || type ===''){
            alert("No Guests in the selected room")
        }else{
        axios.post("http://localhost:4000/room/vacate/"+roomid+"/"+date+"/"+name+"")
        .then((response)=>{
         if(response.data.success){ 
            alert(response.data.message)
            window.location.reload(false);
            /*console.log(type)
            if((type).toString() ==='Single'){
                this.getSingleRooms()
            }else if((type).toString() ==='Twin'){
                axios.get("http://localhost:4000/room/getallroomsontype/Twin")
                .then((response)=>{
                if(response.data.success){
                    this.setState({ twinorooms:response.data.message})
                }else{
                    console.log(response.data.message)
                }
                })
                .catch((error)=>{console.log(error)})
            }else if((type).toString() ==='Trio'){
                this.triorooms()
            }else if((type).toString() ==='Quad'){
                this.getQuadRooms()
            }*/
         }else{
             alert("Problems in vacating the room..!!")
             console.log(response.data.message)
         }
        })
        .catch((error)=>{
            console.log(error)
        })
        }
    }

    getGuestDetails(roomid,date,name){
        if(date === '' || name ===''){
             alert("No Guests in the selected room")
        }else{
         axios.get("http://localhost:4000/room/getguestdetails/"+roomid+"/"+date+"/"+name+"")
         .then((response)=>{
           this.setState({ guestdetails:response.data.message})
           console.log(response.data.message)
         })
         .catch((error)=>{
             console.log(error)
         })
     }
     }
    
    renderSingleRooms() {
          return this.state.singlerooms.map(currentsingleroom => {
            return <RoomCard room={currentsingleroom}  getGuestDetails={this.getGuestDetails} guestdetails = {this.state.guestdetails} vacateRoom={this.vacateRoom} key={currentsingleroom._id}/>;
          })
      }

    renderTwinoRooms() {
        return this.state.twinorooms.map(currenttwinoroom => {
          return <RoomCard room={currenttwinoroom}  getGuestDetails={this.getGuestDetails} guestdetails = {this.state.guestdetails} vacateRoom={this.vacateRoom} key={currenttwinoroom._id}/>;
        })
    }

    renderTrioRooms() {
        return this.state.triorooms.map(currenttrioroom => {
          return <RoomCard room={currenttrioroom}  getGuestDetails={this.getGuestDetails} guestdetails = {this.state.guestdetails} vacateRoom={this.vacateRoom} key={currenttrioroom._id} />;
        })
    }

    renderQuadRooms(){
        return this.state.quadrooms.map(currentquadroom => {
            return <RoomCard room={currentquadroom}  getGuestDetails={this.getGuestDetails} guestdetails = {this.state.guestdetails} vacateRoom={this.vacateRoom} key={currentquadroom._id}/>;
        })
    }

    displayViewGuestModal(){
            return <ViewGuestModal guestdetails={this.guestdetails} />;
    }

    render(){
        return(
            <div>
                <NavBar/>
                <div className="card" style={{padding:"10px",margin:"20px"}}>
                    <div className="card-header bg-dark text-light">
                        SINGLE ROOMS
                    </div>
                    <div className="card-body">
                        <div style={{display:"flex",justifyContent:"center"}}>
                                { this.renderSingleRooms() }
                        </div>
                    </div>
                </div>
                <div className="card" style={{padding:"10px",margin:"20px"}}>
                    <div className="card-header bg-dark text-light">
                        TWINO ROOMS
                    </div>
                    <div className="card-body">
                        <div style={{display:"flex",justifyContent:"center"}}>
                            { this.renderTwinoRooms() }
                        </div>
                    </div>
                </div>
                <div className="card" style={{padding:"10px",margin:"20px"}}>
                    <div className="card-header bg-dark text-light">
                        TRIO ROOMS
                    </div>
                    <div className="card-body">
                        <div style={{display:"flex",justifyContent:"center"}}>
                            { this.renderTrioRooms() }
                        </div>
                    </div>
                </div>
                <div className="card" style={{padding:"10px",margin:"20px"}}>
                    <div className="card-header bg-dark text-light">
                        QUAD ROOMS
                    </div>
                    <div className="card-body">
                        <div style={{display:"flex",justifyContent:"center"}}>
                            { this.renderQuadRooms() }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}