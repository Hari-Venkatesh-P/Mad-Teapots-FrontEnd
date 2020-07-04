import React, { Component } from "react";
import NavBar from "../components/navbar";


import axios from 'axios';


export default class BookRoom extends Component {

  constructor(props){
    super(props);
    this.state = {
      firstname:'',
      lastname:'',
      address:"",
      city:"",
      mobile:'',
      roomtype:'',
      noofpersons:'',
      daysofstay:'',
      checkindate: new Date(),
      checkoutdate: new Date(),
    }
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeRoomtype = this.onChangeRoomtype.bind(this);
    this.onChangeNoofPersons = this.onChangeNoofPersons.bind(this);
    this.onChangeCheckInDate = this.onChangeCheckInDate.bind(this);
    this.onChangeCheckOutDate = this.onChangeCheckOutDate.bind(this);
    this.bookRoom = this.bookRoom.bind(this);
  }


  componentDidMount(){
    if(sessionStorage.getItem('admin') === null) {
      window.location = "/"
    }
  }

  onChangeFirstName(e){
    this.setState({
        firstname : e.target.value
      }); 
  }

  onChangeLastName(e){
    this.setState({
        lastname : e.target.value
      }); 
  }

  onChangeAddress(e){
    this.setState({
        address : e.target.value
      }); 
  }

  onChangeMobile(e){
    this.setState({
        mobile : e.target.value
      }); 
  }

  onChangeCity(e){
    this.setState({
        city : e.target.value
      }); 
  }

  onChangeRoomtype(e){
    this.setState({
        roomtype : e.target.value
      }); 
  }

  onChangeNoofPersons(e){
    this.setState({
        noofpersons : e.target.value
      }); 
  }

  onChangeCheckInDate(e){
    this.setState({
        checkindate :e.target.value
      }); 
  }

  onChangeCheckOutDate(e){
    this.setState({
        checkoutdate :e.target.value
      }); 
  }

  checkRoomCompatible(type , persons){
    if(type==="Single" && parseInt(persons) >= 2){
        return false
    }else if(type==="Twin" && parseInt(persons) >= 3){
      return false
    }else if(type==="Trio" && parseInt(persons) >= 4){
      return false
    }else if(type==="Quad" && parseInt(persons) >= 6){
      return false
    }else{
      return true
    }
  }

  bookRoom(e){
    e.preventDefault();
    if(this.state.roomtype === ''){
      this.setState({
        roomtype : 'Single'
      });
    }
    const reqbody = {
      firstName : this.state.firstname,
      lastName : this.state.lastname,
      address : this.state.address,
      mobile : this.state.mobile,
      city : this.state.city,
      roomType : this.state.roomtype,
      inPersons : this.state.noofpersons,
      checkindate : this.state.checkindate,
      expectedCheckOutDate : this.state.checkoutdate,
    }
    if(this.checkRoomCompatible(this.state.roomtype,this.state.noofpersons)){
      axios.post("https://hari-mad-teapots-backend.herokuapp.com/room/book",reqbody)
    .then((response)=>{
        if(response.data.success){
          alert(response.data.message)
          console.log(response.data.message)
        }else{
          alert("Issue with booking the room")
          console.log(response.data.message)
        } 
      
    })
    .catch((error)=>{console.log(error)})
    }else{
      alert("Selected Room Type is not compatible")
    }
    
  }

  render() {
    return (
      <div>
        <NavBar />
        <div style={{paddingTop: "1%"}}>
        <div className="container">
          <div style={{display:"flex",justifyContent:"flexStart"}}>
              <h3 style={{fontFamily: "Oswald",color:"#293d3d"}}>Book Room : </h3>
          </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
							    <input type="text"
                    className="form-control"
                    value={this.state.firstname}
                    onChange={this.onChangeFirstName}
								    placeholder="First Name"
							    />
						    </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
							    <input type="text"
							  	  className="form-control"
                    placeholder="Last Name"
                    onChange={this.onChangeLastName}
                    value={this.state.lastname}
							    />
						    </div>
              </div>
            </div>
            <div className="form-group">
							<textarea
                className="form-control"
                value={this.state.address}
                placeholder="Address"
                onChange={this.onChangeAddress}
                rows = "2"
							/>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
							    <input type="text"
                    className="form-control"
                    value={this.state.city}
                    onChange={this.onChangeCity}
								    placeholder="City Name"
							    />
						    </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
							    <input type="text"
                    className="form-control"
                    value={this.state.mobile}
                    onChange={this.onChangeMobile}
								    placeholder="Mobile Number"
							    />
						    </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
							    <select
                    className="form-control"
                    onChange={this.onChangeRoomtype}
                    value={this.state.roomtype}
								    >
								    <option value="Single">Single Rooms</option>
								    <option value="Twin">Twin Rooms</option>
								    <option value="Trio">Trio Rooms</option>
								    <option value="Quad">Quad Rooms</option>
							    </select>
						    </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <div className="form-group">
							      <input type="text"
                      className="form-control"
                      onChange={this.onChangeNoofPersons}
                      value={this.state.noofpersons}
								      placeholder="Number of Persons"
							      />
						    </div>
						    </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2">CHECK IN DATE</div>
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="form-group">
                      <input type="date" value={this.state.checkindate} onChange={this.onChangeCheckInDate} />
						        </div>
						      </div>
                </div>  
                <div className="col-md-2">EXPECTED CHECK OUT  DATE</div>
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="form-group">
                      <input type="date" value={this.state.checkoutdate} onChange={this.onChangeCheckOutDate} />
						        </div>
						      </div>
                </div>
            </div>
            <div className="form-group">
            <button
										type="button"
										className="btn btn-dark"
										onClick={this.bookRoom}>
										Book Room
									</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
