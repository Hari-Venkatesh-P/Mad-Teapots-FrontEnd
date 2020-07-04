import React, { Component } from 'react'
import NavBar from '../components/navbar'

import axios from 'axios';
import '../styles/views.css'

import ViewGuestModal from '../components/viewguestmodal'


export default class RoomReport extends Component{

    constructor(props){
        super(props)
		this.state = {
            roomdetails:[],
            guestdetails : [],
		}
    }

    componentDidMount(){
        this.getRoomDetails()
    }

    getRoomDetails(){
        axios.get("https://hari-mad-teapots-backend.herokuapp.com/room/getroomdetails")
    .then((response)=>{
      this.setState({ roomdetails:response.data.message})
    })
    .catch((error)=>{console.log(error)})
    }

    getGuestDetails(roomid,date,name){
       if(this.checkEmpty(date,name)){
            alert("No Guests in the selected room")
            this.setState({ guestdetails:[]})
       }else{
        axios.get("https://hari-mad-teapots-backend.herokuapp.com/room/getguestdetails/"+roomid+"/"+date+"/"+name+"")
        .then((response)=>{
          this.setState({ guestdetails:response.data.message})
          console.log(response.data.message)
        })
        .catch((error)=>{
            this.setState({ guestdetails:[]})
            console.log(error)
        })
    }
    }


    vacateRoom(roomid,date,name){
        if(this.checkEmpty(date,name)){
            alert("No Guests in the selected room")
        }else{
        axios.post("https://hari-mad-teapots-backend.herokuapp.com/room/vacate/"+roomid+"/"+date+"/"+name+"")
        .then((response)=>{
         if(response.data.success){
            alert(response.data.message)
            this.getRoomDetails()
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

    checkEmpty(date,name){
        if(date === '' || name===''){
            return true
       }else{
            return false
       }
    }

    renderRoomDetails(){
        return this.state.roomdetails.map(currentroom => {
            return(
                <tr key={currentroom._id}>
                                <th className="display">{currentroom.roomId}</th>
                                <td className="display">{currentroom.roomType}</td>
                                <td className="display">{(currentroom.userName).toString() ==='' ? <p> - </p> : <p> {currentroom.userName} </p>}</td>
                                <td className="display">{(currentroom.inPersons)}</td>
                                <td className="display"><div>{(currentroom.availablity).toString() ==='true' ? <div className="alert alert-success" role="alert"> Room available </div> : <div className="alert alert-danger" role="alert"> Room not available </div>}</div></td>
                                <td className="display">{(currentroom.userName).toString() === '' ? <p> - </p> :<div style={{ cursor:"pointer" }}> <i className="fa fa-eye" onClick={()=>{ this.getGuestDetails(currentroom.roomId,currentroom.checkInDate,currentroom.userName) }} data-toggle="modal" data-target="#exampleModal"></i><ViewGuestModal guestdetails={this.state.guestdetails}></ViewGuestModal></div>}</td>
                                <td className="display" style={{ cursor:"pointer" }}><i className="fa fa-sign-out" onClick={()=>{ this.vacateRoom(currentroom.roomId,currentroom.checkInDate,currentroom.userName) }}></i></td>
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
                    <h3 style={{fontFamily: "Oswald",color:"#293d3d"}}>Room Current Details : </h3>
                </div>
                    <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Room ID</th>
                                <th scope="col">Room Type</th>
                                <th scope="col">Guest Name</th>
                                <th scope="col">Total Persons</th>
                                <th scope="col">Availablity</th>
                                <th scope="col">View More</th>
                                <th scope="col">Vacate Room</th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.renderRoomDetails()}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}