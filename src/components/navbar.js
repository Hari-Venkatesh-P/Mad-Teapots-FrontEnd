import React, { Component } from "react";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
          Mad Teapots
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link " href="/">
                Home 
              </a>
              <a className="nav-item nav-link" href="/bookrooms">
                Book Rooms
              </a>
              <a className="nav-item nav-link" href="/rooms">
                Rooms
              </a>
              <a className="nav-item nav-link" href="/roomreport">
                Room Report
              </a>
              <a className="nav-item nav-link" href="/roomledger">
                Room Ledger
              </a>
              <a className="nav-item nav-link" href="/receipereport">
                Receipe Report
              </a>
              <a className="nav-item nav-link" href="/foodcourt">
                Food Court
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
