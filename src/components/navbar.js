import React, { Component } from "react";

export default class NavBar extends Component {

  isCookLoggedIn() {
    return !(sessionStorage.getItem('cook') === null)
  }

  isAdminLoggedIn() {
    return !(sessionStorage.getItem('admin') === null)
  }

  isGuestLoggedIn() {
    return !(sessionStorage.getItem('guest') === null || sessionStorage.getItem('table_id') === null)
  }

  logOutUser(){
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


  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">MAD TEAPOTS</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {this.isAdminLoggedIn()  &&
              <li className="nav-item">
                <a className="nav-item nav-link"  href="/bookrooms" >Book Rooms</a>
              </li>
              }
              
              {this.isAdminLoggedIn()  &&
              <li className="nav-item">
                <a className="nav-item nav-link"  href="/rooms">Rooms</a>
              </li>
              }
              {this.isAdminLoggedIn()  &&
              <li className="nav-item"> 
                <a className="nav-item nav-link" href="/roomreport">Room Report</a>
              </li>
              }
              {this.isAdminLoggedIn()  &&
              <li className="nav-item">
                <a className="nav-item nav-link"  href="/roomledger" >Room Ledger</a>
              </li>
              }
              {this.isGuestLoggedIn()  &&
              <li className="nav-item">
                <a className="nav-item nav-link"  href="/foodcourt" >Food Court</a>
              </li>
              }
              {this.isGuestLoggedIn()  &&
              <li className="nav-item">
                <a className="nav-item nav-link" href="/orders">My Orders</a>
              </li>
              }
              {this.isCookLoggedIn()  &&
              <li className="nav-item">
                <a className="nav-item nav-link" href="/receipereport">Receipe Report</a>
              </li>
              }
              {(this.isCookLoggedIn() || this.isAdminLoggedIn())  &&
              <li className="nav-item">
                <a className="nav-item nav-link" href="/tables">Table Report</a>
              </li>
              }
              {(this.isCookLoggedIn() || this.isAdminLoggedIn())  &&
              <li className="nav-item">
                <a className="nav-item nav-link" href="/tableledger">Table Ledger</a>
              </li>
              }
            </ul>
            <div className="form-inline my-2 my-lg-0">
              <button className="btn btn-outline-success my-2 my-sm-0"  type="submit" onClick={()=>{ this.logOutUser() }} >LOGOUT</button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
