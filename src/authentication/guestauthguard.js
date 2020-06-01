import React  from 'react';
import { withRouter } from 'react-router';

export default function requireGuestAuth(Component) {

class GuestAuthGuard extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
     table_id : sessionStorage.getItem("table_id"),
     guest : sessionStorage.getItem("guest"),
  }
 }

 componentDidMount() {
  this.checkGuestAuth();
 }


 checkGuestAuth() {
  const location = this.props.location;
  const redirect = location.pathname + location.search;
  if ( ! (sessionStorage.getItem("table_id") && sessionStorage.getItem("guest") )) {
   this.props.history.push(`/login?redirect=${redirect}`);
  }
 }


render() {
  return  !(sessionStorage.getItem('guest') === null || sessionStorage.getItem('table_id') === null) ? <Component { ...this.props } /> : null;
  }
 }
 return  withRouter(GuestAuthGuard)

}