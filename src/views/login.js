import React, { Component } from 'react'


import axios from 'axios';

export default class LoginPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            class:'Non Air Conditioned',
            userName:'',
            name:'',
            password:'',
        }
        this.onChangeClass = this.onChangeClass.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.registerGuest = this.registerGuest.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    onChangeName(e){
        this.setState({
            name :e.target.value
          }); 
    }

    onChangePassword(e){
        this.setState({
            password :e.target.value
          }); 
    }

    onChangeClass(e){
        this.setState({
            class :e.target.value
          }); 
    }

    onChangeUserName(e){
        this.setState({
            userName :e.target.value
          }); 
    }

    loginUser(e){
        e.preventDefault();
        console.log(this.state.name)
        console.log(this.state.password)
        if(this.state.name==='admin' && this.state.password==='admin@123'){
            alert("Logged in as Admin")
            sessionStorage.setItem("admin","admin")
            window.location = "/rooms"
        }else if(this.state.name==='cook' && this.state.password==='cook@123'){
            alert("Logged in as Chef")
            sessionStorage.setItem("cook","cook")
            window.location = "/receipereport"
        }else{
            alert("Invalid Login credentials")
        }
    }

    registerGuest(e){
        e.preventDefault();
        if(this.state.userName === '' || this.state.class === ''){
            alert("Issue with booking the table")
        }else{
            const reqbody = {
                userName : this.state.userName,
                class : this.state.class,
              }
              console.log(reqbody)
              axios.post("http://localhost:4000/receipe/registerguest",reqbody)
              .then((response)=>{
                  if(response.data.success){
                    alert(response.data.message)
                    sessionStorage.setItem("guest",this.state.userName)
                    sessionStorage.setItem("table_id",(response.data.tableNumber).toString())
                    window.location = "/foodcourt"
                  }else{
                    alert("Issue with booking the table")
                    console.log(response.data.message)
                  } 
                
              })
              .catch((error)=>{console.log(error)})
        }
    }


    render(){
        return(
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <a className="navbar-brand">Mad Teapots</a>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="text"  value={this.state.name} onChange={this.onChangeName}   placeholder="Username" aria-label="text"></input>
                        <input className="form-control mr-sm-2" type="password"  value={this.state.password} onChange={this.onChangePassword}  placeholder="Password" aria-label="password"></input>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.loginUser}>Login</button>
                    </form>
                </nav>
                <div style={{ height: "100%",width: "40%",position: "absolute",paddingTop: "20px",left: "0",backgroundColor: "lightsteelblue"}}>
                    <div style={{marginLeft:"15%"}}>
                        <h1 style={{fontFamily: "Oswald"}}>Mad Teapots</h1>
                        <br/>
                        <h3 style={{fontFamily: "Oswald"}}>Where food speaks with your palate..!!</h3>
                    </div> 
                </div>
                <div style={{ height: "100%" ,width: "60%",position: "absolute",zIndex: "1",overflowX: "hidden",paddingTop: "20px",right: "0",backgroundColor: "lightsteelblue"}}>
                    <div className="container">
                    <div style={{marginLeft:"15%"}}>
                        <h2 style={{fontFamily: "Oswald"}}>Wanna eat delicious ? </h2><br/>
                        <h4 style={{fontFamily: "Oswald"}}>Book your table here :)</h4>
                    </div> 
                            <div style={{marginLeft:"15%"}}>
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group">
                                        <br/>
							            <input type="text" className="form-control" value={this.state.userName} onChange={this.onChangeUserName} placeholder="Your name here" ></input>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group">
                                        <br/>
							            <div className="form-group">
							                <select className="form-control" onChange={this.onChangeClass} value={this.state.class}>
								                <option value="Non Air Conditioned">Non Air Conditioned</option>
								                <option value="Air Conditioned">Air Conditioned</option>
							                </select>
						                </div>
                                    </div>
                                </div>
                            </div>
                        <br/>
                        <div style={{display:"flex",justifyContent:"center"}}>
                            <button type="button" className="btn btn-dark" onClick={this.registerGuest}> Book Me a Table </button>
                        </div>
                    </div>
                    </div>   
                </div>
            </div>
        )
    }
}