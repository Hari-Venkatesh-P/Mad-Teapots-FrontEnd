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

     verifyEmpty(str){
        if(str)
        {
            if(typeof str === 'string' || typeof str === 'number' )
            {
                if(str.toString()===''){
                    return 'Nil'
                }else{   
                    return str
                }
            }else{
                if(str.toString() !== 'false'){
                    return 'Room Available'
                }else{   
                    return 'Room not Available'
                }
            }
        }
        else{
            return 'Nil'
        }
    }

    componentDidMount(){
    axios.get("http://localhost:4000/room/getroomdetails")
    .then((response)=>{
      this.setState({ roomdetails:response.data.message})
    })
    .catch((error)=>{console.log(error)})
    }


    getGuestDetails(roomid,date,name){
       if(roomid === '' || date === '' || name===''){
            alert("No Guests in the selected room")
            this.setState({ guestdetails:[]})
       }else{
        axios.get("http://localhost:4000/room/getguestdetails/"+roomid+"/"+date+"/"+name+"")
        .then((response)=>{
          this.setState({ guestdetails:response.data.message})
        })
        .catch((error)=>{
            this.setState({ guestdetails:[]})
            console.log(error)
        })
    }
    }


    vacateRoom(roomid,date,name){
        axios.post("http://localhost:4000/room/vacate/"+roomid+"/"+date+"/"+name+"")
        .then((response)=>{
         if(response.data.success){
            alert(response.data.message)
         }else{
             alert("Problems in vacating the room..!!")
             console.log(response.data.message)
         }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    checkNotEmpty(roomid,date,name){
        if(roomid === '' || date === '' || name===''){
            return 'false'
       }else{
            return 'true'
       }
    }

    getRoomDetails(){
        return this.state.roomdetails.map(currentroom => {
            return(
                <tr key={currentroom._id}>
                                <td >{currentroom.roomId}</td>
                                <td>{this.verifyEmpty(currentroom.userName)}</td>
                                <td>{this.verifyEmpty(currentroom.inPersons)}</td>
                                <td>{this.verifyEmpty(currentroom.availablity)}</td>
                                <td>
                                    <i className="fa fa-eye" onClick={()=>{ this.getGuestDetails(currentroom.roomId,currentroom.checkInDate,currentroom.userName) }} data-toggle="modal" data-target="#exampleModal"></i> 
                                              <ViewGuestModal guestdetails={this.state.guestdetails}></ViewGuestModal>
                                </td>
                                <td><i className="fa fa-sign-out" onClick={()=>{ this.vacateRoom(currentroom.roomId,currentroom.checkInDate,currentroom.userName) }}></i></td>
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
                                <th scope="col">Guest Name</th>
                                <th scope="col">Total Persons</th>
                                <th scope="col">Availablity</th>
                                <th scope="col">View More</th>
                                <th scope="col">Vacate Room</th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.getRoomDetails()}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}