import React, { Component }  from 'react';
import './App.css';
import { BrowserRouter, Route   } from 'react-router-dom';


import Rooms from '../src/views/rooms'; 
import BookRoom from '../src/views/bookroom';
import RoomLedger from '../src/views/roomledger'; 
import RoomReport from '../src/views/roomreport';
import Receipe from '../src/views/receipes';
import FoodCourt from '../src/views/foodcourt';
import LoginPage from '../src/views/login';
import Orders from "../src/views/orders";
import Tables from "./views/table";
import TableLedger from "./views/tableledger";
import { AdminProtectedRoute, GuestProtectedRoute, CookProtectedRoute , AdminAndCookSharedProtectedRoute } from '../src/authentication/protectedroute'


class App extends Component {


  render() {
    return (
      <BrowserRouter>
      <Route exact path="/" component={LoginPage} />
      {/* <Route exact path="/rooms" component={Rooms} />
      <Route exact path="/bookrooms" component={BookRoom} />
      <Route exact path="/roomledger" component={RoomLedger} />
      <Route exact path="/roomreport" component={RoomReport} />
      <Route exact path="/receipereport" component={Receipe} />
      <Route exact path="/foodcourt" component={FoodCourt} />
      <Route exact path="/orders" component={Orders} />
      <Route exact path="/tables" component={Tables} />
      
      <Route exact path="/tableledger" component={TableLedger} /> */}

      <GuestProtectedRoute path="/orders" exact component={Orders}></GuestProtectedRoute>
      <GuestProtectedRoute path="/foodcourt" exact component={FoodCourt}></GuestProtectedRoute>


      <AdminAndCookSharedProtectedRoute path="/receipereport" exact component={Receipe}></AdminAndCookSharedProtectedRoute>
      <AdminAndCookSharedProtectedRoute path="/tables" exact component={Tables}></AdminAndCookSharedProtectedRoute>


      <AdminProtectedRoute path="/tableledger" exact component={TableLedger}></AdminProtectedRoute>
      <AdminProtectedRoute path="/roomledger" exact component={RoomLedger}></AdminProtectedRoute>
      <AdminProtectedRoute path="/rooms" exact component={Rooms}></AdminProtectedRoute>
      <AdminProtectedRoute path="/roomreport" exact component={RoomReport}></AdminProtectedRoute>
      <AdminProtectedRoute path="/bookrooms" exact component={BookRoom}></AdminProtectedRoute>
      </BrowserRouter>);
  }
}

export default App;
