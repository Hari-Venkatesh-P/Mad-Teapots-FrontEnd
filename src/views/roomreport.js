import React, { Component } from 'react'
import NavBar from '../components/navbar'

import axios from 'axios';

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
        if(sessionStorage.getItem('admin') === null) {
            if(sessionStorage.getItem('cook')!==null)
            {
                sessionStorage.removeItem('cook');
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
        this.getRoomDetails()
    }

    getRoomDetails(){
        axios.get("http://localhost:4000/room/getroomdetails")
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
        axios.get("http://localhost:4000/room/getguestdetails/"+roomid+"/"+date+"/"+name+"")
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
        axios.post("http://localhost:4000/room/vacate/"+roomid+"/"+date+"/"+name+"")
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
                                <th >{currentroom.roomId}</th>
                                <td >{currentroom.roomType}</td>
                                <td>{(currentroom.userName).toString() ==='' ? <p> - </p> : <p> {currentroom.userName} </p>}</td>
                                <td>{(currentroom.inPersons)}</td>
                                <td><div>{(currentroom.availablity).toString() ==='true' ? <div className="alert alert-success" role="alert"> Room available </div> : <div className="alert alert-danger" role="alert"> Room not available </div>}</div></td>
                                <td>{(currentroom.userName).toString() === '' ? <p> - </p> :<div style={{ cursor:"pointer" }}> <i className="fa fa-eye" onClick={()=>{ this.getGuestDetails(currentroom.roomId,currentroom.checkInDate,currentroom.userName) }} data-toggle="modal" data-target="#exampleModal"></i><ViewGuestModal guestdetails={this.state.guestdetails}></ViewGuestModal></div>}</td>
                                <td style={{ cursor:"pointer" }}><i className="fa fa-sign-out" onClick={()=>{ this.vacateRoom(currentroom.roomId,currentroom.checkInDate,currentroom.userName) }}></i></td>
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